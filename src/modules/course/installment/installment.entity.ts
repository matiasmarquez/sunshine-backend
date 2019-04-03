import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import { Course } from '../course/course.entity';
import { InstallmentAbstract } from 'common/entities/installment.abstract';

@Entity('courses_installments')
export class CourseInstallment extends InstallmentAbstract {
	@ManyToOne(type => Course, course => course.installments, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	course: Course;
}
