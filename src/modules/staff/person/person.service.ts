import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudOperations } from 'common/services/crud.service';
import { StaffCategoryService } from '../category/category.service';

import { Person } from './person.entity';
import { StaffPersonUpdateInput, StaffPersonCreateInput } from 'graphql.schema';
import { CourseService } from 'modules/course/course/course.service';

@Injectable()
export class StaffPersonService extends CrudOperations {
	constructor(
		@InjectRepository(Person)
		protected readonly personRepository: Repository<Person>,
		@Inject(StaffCategoryService)
		protected readonly categoryService: StaffCategoryService,
		@Inject(CourseService)
		protected readonly courseService: CourseService,
	) {
		super(personRepository);
	}

	findAll(): Promise<Person[]> {
		return super.findAll();
	}

	findOneById(id: string): Promise<Person> {
		return super.findOneById(id);
	}

	findByCategory(id: string): Promise<Person[]> {
		return super.findAllBy({ where: { category: { id } } });
	}

	async create(data: StaffPersonCreateInput): Promise<Person> {
		const { categoryId, coursesIds } = data;
		const category = await this.categoryService.findOneById(categoryId);
		let courses = [];
		if (coursesIds) {
			courses = await this.courseService.findByIds(coursesIds);
		}
		return super.create({ ...data, category, courses });
	}

	async update(id: string, data: StaffPersonUpdateInput): Promise<Person> {
		let dataOpc = {};
		const { categoryId, coursesIds } = data;
		if (categoryId) {
			const category = await this.categoryService.findOneById(categoryId);
			dataOpc = { category };
		}
		if (coursesIds) {
			const courses = await this.courseService.findByIds(coursesIds);
			dataOpc = { ...dataOpc, courses };
		}
		return super.update(id, { ...data, ...dataOpc });
	}

	async delete(id: string): Promise<Person> {
		return super.delete(id);
	}
}
