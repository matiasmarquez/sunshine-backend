import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	ManyToOne,
} from 'typeorm';

import { Course } from 'modules/course/course/course.entity';
import { StaffCategory } from '../category/category.entity';

@Entity('staff_people')
export class Person {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(type => StaffCategory, category => category.people, {
		eager: true,
	})
	category: StaffCategory;

	@ManyToMany(type => Course, course => course.staff, {
		eager: true,
	})
	courses: Course[];

	@Column('varchar')
	name: string;

	@Column('varchar')
	lastName: string;

	@Column('varchar', {
		nullable: true,
	})
	address: string;

	@Column('varchar', {
		nullable: true,
	})
	phone: string;

	@Column('varchar', {
		nullable: true,
	})
	email: string;
}
