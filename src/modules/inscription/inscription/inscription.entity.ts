import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	OneToMany,
} from 'typeorm';

import { Course } from 'modules/course/course/course.entity';
import { Student } from 'modules/student/student.entity';

import { InscriptionInstallment } from '../installment/installment.entity';
import { InscriptionPayState } from '../paystate/paystates.entity';

@Entity('inscriptions')
export class Inscription {
	static readonly STARTED_STATE = 'started';
	static readonly IN_PROGRESS_STATE = 'in_progress';
	static readonly COMPLETED_STATE = 'completed';

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(type => Course, {
		eager: true,
	})
	course: Course;

	@ManyToOne(type => Student, {
		eager: true,
	})
	student: Student;

	@OneToMany(
		type => InscriptionInstallment,
		installment => installment.inscription,
		{
			eager: true,
			cascade: true,
		},
	)
	installments: InscriptionInstallment[];

	@OneToMany(type => InscriptionPayState, paystate => paystate.inscription, {
		eager: true,
	})
	payStates: InscriptionPayState[];

	@Column('varchar')
	state: string;

	@Column('varchar', {
		nullable: true,
	})
	currentPayState: string;

	@Column({
		type: 'float',
		precision: 14,
		scale: 2,
	})
	price: number;
}
