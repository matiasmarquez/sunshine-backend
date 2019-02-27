import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from './course.entity';

@Entity('courses_installments')
export class Installment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(type => Course, course => course.installments)
	course: Course;

	@Column('int')
	number: number;

	@Column({
		type: 'float',
		precision: 14,
		scale: 2,
	})
	price: number;
}
