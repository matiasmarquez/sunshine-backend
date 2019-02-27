import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	OneToMany,
} from 'typeorm';

import { Course } from 'src/course/course.entity';
import { Student } from 'src/student/student.entity';
import { InscriptionInstallment } from './installment.entity';
import { InscriptionPayState } from './paystates.entity';

@Entity('inscriptions')
export class Inscription {
	static readonly STARTED_STATE = 'started';
	static readonly IN_PROGRESS_STATE = 'in_progress';
	static readonly COMPLETED_STATE = 'completed';

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(type => Course)
	course: Course;

	@ManyToOne(type => Student)
	student: Student;

	@OneToMany(
		type => InscriptionInstallment,
		installment => installment.inscription,
	)
	installments: InscriptionInstallment[];

	@OneToMany(type => InscriptionPayState, paystate => paystate.inscription)
	paystates: InscriptionPayState[];

	@Column('varchar')
	state: string;

	@Column({
		type: 'float',
		precision: 14,
		scale: 2,
	})
	price: number;
}
