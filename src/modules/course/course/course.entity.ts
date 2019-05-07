import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
	OneToMany,
} from 'typeorm';

import { CourseCategory } from '../category/category.entity';
import { CourseInstallment } from '../installment/installment.entity';
import { Person } from 'modules/staff/person/person.entity';

@Entity('courses')
export class Course {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar' })
	name: string;

	@ManyToOne(type => CourseCategory, category => category.courses, {
		eager: true,
	})
	category: CourseCategory;

	@OneToMany(type => CourseInstallment, installment => installment.course, {
		eager: true,
		cascade: true,
	})
	installments: CourseInstallment[];

	@ManyToMany(type => Person, staff => staff.courses)
	@JoinTable({
		name: 'courses_staff',
		joinColumn: {
			name: 'courseId',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'personId',
			referencedColumnName: 'id',
		},
	})
	staff: Person[];

	@Column('text', {
		nullable: true,
	})
	description: string;

	@Column('varchar')
	duration: string;

	@Column('varchar')
	schedule: string;

	@Column({
		type: 'float',
		precision: 14,
		scale: 2,
	})
	price: number;

	@CreateDateColumn()
	created: Date;
}
