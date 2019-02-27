import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Course } from './course.entity';
import { InstallmentAbstract } from 'src/abstract/installment.abstract';

@Entity('courses_installments')
export class CourseInstallment extends InstallmentAbstract {
	@ManyToOne(type => Course, course => course.installments)
	course: Course;
}
