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

@Entity('inscriptions')
export class Inscription {
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

	@Column('varchar')
	state: string;

	@Column({
		type: 'float',
		precision: 14,
		scale: 2,
		nullable: true,
	})
	price: number;

	public hasInstallmentsNotPayed(): boolean {
		let has = false;
		const installments = this.installments;
		const date = new Date();
		const currentMonth = date.getMonth();
		for (const installment of installments) {
			let date = installment.date;
			if (typeof installment.date === 'string') {
				const parts = installment.date.split('-');
				date = new Date(
					parseInt(parts[0]),
					parseInt(parts[1]) - 1,
					parseInt(parts[2]),
				);
			}
			if (currentMonth >= date.getMonth() && installment.paid === false) {
				has = true;
				break;
			}
		}
		return has;
	}
}
