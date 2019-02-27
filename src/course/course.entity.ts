import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
} from 'typeorm';

import { CourseCategory } from './category.entity';

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

	@Column('text')
	briefDescription: string;

	@Column('text')
	description: string;

	@Column('varchar')
	duration: string;

	@Column('varchar')
	schedule: string;

	@Column('float')
	price: number;

	@CreateDateColumn()
	created: Date;
}
