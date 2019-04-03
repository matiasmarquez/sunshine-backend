import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
} from 'typeorm';

import { Course } from '../course/course.entity';

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

	public static get colors() {
		return ['#E67401', '#009C53', '#DD3624', '#0061A8', '#7C2282'];
	}
}
