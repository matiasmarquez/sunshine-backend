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

import { CourseCategory } from './category.entity';
import { CourseInstallment } from './installment.entity';
import { Person } from 'src/staff/person.entity';

@Entity('courses')
export class Course {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'varchar',
		unique: true,
	})
	name: string;

	@ManyToOne(type => CourseCategory, category => category.courses)
	category: CourseCategory;

	@OneToMany(type => CourseInstallment, installment => installment.course)
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

	@Column('text')
	briefDescription: string;

	@Column('text')
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
