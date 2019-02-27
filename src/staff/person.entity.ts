import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	ManyToOne,
} from 'typeorm';

import { Course } from 'src/course/course.entity';
import { PersonCategory } from './category.entity';

@Entity('staff_people')
export class Person {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(type => PersonCategory, category => category.people)
	category: PersonCategory;

	@ManyToMany(type => Course, course => course.staff)
	courses: Course[];

	@Column('varchar')
	name: string;

	@Column('varchar')
	lastName: string;
}
