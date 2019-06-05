import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
} from 'typeorm';

import { Course } from 'modules/course/course/course.entity';

@Entity('courses_categories')
export class CourseCategory {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToMany(type => Course, course => course.category)
	courses: Course[];

	@Column('varchar')
	name: string;

	@Column('text', {
		nullable: true,
	})
	description: string;

	@Column('varchar')
	color: string;

	@CreateDateColumn()
	created: Date;
}
