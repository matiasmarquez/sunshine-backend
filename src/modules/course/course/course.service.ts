import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudOperations } from 'common/services/crud.service';

import { Course } from './course.entity';
import { CourseCreateDTO } from './dto/course.create.dto';
import { CourseUpdateInput } from 'graphql.schema';

import { CourseCategoryService } from '../category/category.service';

import { CourseInstallment } from '../installment/installment.entity';
import { InstallmentService } from '../installment/installment.service';

@Injectable()
export class CourseService extends CrudOperations {
	constructor(
		@InjectRepository(Course)
		protected readonly courseRepository: Repository<Course>,
		@Inject(CourseCategoryService)
		protected readonly categoryService: CourseCategoryService,
		@Inject(InstallmentService)
		protected readonly installmentService: InstallmentService,
	) {
		super(courseRepository);
	}

	findAll(): Promise<Course[]> {
		return super.findAll();
	}

	findOneById(id: string): Promise<Course> {
		return super.findOneById(id);
	}

	findByCategory(id: string): Promise<Course[]> {
		return super.findAllBy({ where: { category: { id } } });
	}

	async create(data: CourseCreateDTO): Promise<Course> {
		const { categoryId, installments: installmentsArray } = data;
		let installments = [];
		if (installmentsArray && installmentsArray.length > 0) {
			installments = await this.installmentService.createMany(
				installmentsArray,
			);
		}
		const category = await this.categoryService.findOneById(categoryId);
		return super.create({
			...data,
			category,
			installments,
		});
	}

	async update(id: string, data: CourseUpdateInput): Promise<Course> {
		let dataOpc = {};
		const { categoryId, installments: installmentsArray } = data;
		if (categoryId) {
			const category = await this.categoryService.findOneById(categoryId);
			dataOpc = { category };
		}
		if (installmentsArray && installmentsArray.length > 0) {
			const course = await this.findOneById(id);
			await this.removeInstallments(course);
			const installments = await this.installmentService.updateMany(
				course,
				installmentsArray,
			);
			dataOpc = { ...dataOpc, installments };
		}
		return super.update(id, { ...data, ...dataOpc });
	}

	async removeInstallments(course: Course) {
		await this.courseRepository
			.createQueryBuilder()
			.delete()
			.from(CourseInstallment)
			.where('courseId = :id', { id: course.id })
			.execute();
	}

	delete(id: string): Promise<Course> {
		return super.delete(id);
	}
}
