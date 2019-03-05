import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from './course/course.entity';
import { CourseService } from './course/course.service';
import { CourseResolver } from './course/course.resolver';

import { CourseCategory } from './category/category.entity';
import { CourseCategoryService } from './category/category.service';
import { CourseCategoryResolver } from './category/category.resolver';

import { CourseInstallment } from './installment/installment.entity';
import { InstallmentService } from './installment/installment.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Course, CourseCategory, CourseInstallment]),
	],
	providers: [
		CourseService,
		CourseResolver,
		CourseCategoryService,
		CourseCategoryResolver,
		InstallmentService,
	],
})
export class CourseModule {}
