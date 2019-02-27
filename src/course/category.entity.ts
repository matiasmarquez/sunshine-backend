import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
} from 'typeorm';

import { Course } from './course.entity';

export enum CourseCategoryColor {
	ORANGE = '#E67401',
	GREEN = '#009C53',
	RED = '#DD3624',
	BLUE = '#0061A8',
	PURPLE = '#7C2282',
}

@Entity('courses_categories')
export class CourseCategory {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToMany(type => Course, course => course.category)
	courses: Course[];

	@Column('varchar')
	name: string;

	@Column('text')
	description: string;

	@Column({
		type: 'enum',
		enum: CourseCategoryColor,
	})
	color: CourseCategoryColor;

	@CreateDateColumn()
	created: Date;
}
