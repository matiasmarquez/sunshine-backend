import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudOperations } from 'common/services/crud.service';

import { StaffCategory } from './category.entity';
import {
	StaffCategoryCreateInput,
	StaffCategoryUpdateInput,
} from 'graphql.schema';

@Injectable()
export class StaffCategoryService extends CrudOperations {
	constructor(
		@InjectRepository(StaffCategory)
		protected readonly categoryRepository: Repository<StaffCategory>,
	) {
		super(categoryRepository);
	}

	findAll(): Promise<StaffCategory[]> {
		return super.findAll();
	}

	findOneById(id: string): Promise<StaffCategory> {
		return super.findOneById(id);
	}

	async create(data: StaffCategoryCreateInput): Promise<StaffCategory> {
		return super.create(data);
	}

	async update(
		id: string,
		data: StaffCategoryUpdateInput,
	): Promise<StaffCategory> {
		return super.update(id, data);
	}

	async delete(id: string): Promise<StaffCategory> {
		return super.delete(id);
	}
}
