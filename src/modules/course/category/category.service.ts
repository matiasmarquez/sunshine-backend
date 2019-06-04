import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CourseCategory } from './category.entity';
import { CourseCategoryCreateDTO } from './dto/category.create.dto';
import { CrudOperations } from './../../../common/services/crud.service';
import { CourseCategoryUpdateInput } from 'graphql.schema';

@Injectable()
export class CourseCategoryService extends CrudOperations {
	constructor(
		@InjectRepository(CourseCategory)
		protected readonly categoryRepository: Repository<CourseCategory>,
	) {
		super(categoryRepository);
	}

	async findAll(): Promise<CourseCategory[]> {
		return super.findAll();
	}

	async findOneById(id: string): Promise<CourseCategory> {
		return super.findOneById(id);
	}

	async create(data: CourseCategoryCreateDTO) {
		return super.create(data);
	}

	async update(id: string, data: CourseCategoryUpdateInput) {
		return super.update(id, data);
	}

	async delete(id: string) {
		return super.delete(id);
	}
}
