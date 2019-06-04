import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { StaffCategoryService } from './category.service';
import {
	StaffCategoryUpdateInput,
	StaffCategoryCreateInput,
} from 'graphql.schema';

@Resolver()
export class StaffCategoryResolver {
	constructor(
		@Inject(StaffCategoryService)
		private readonly categoryService: StaffCategoryService,
	) {}

	@Query()
	staffCategories() {
		return this.service.findAll();
	}

	@Query()
	staffCategory(@Args('id') id: string) {
		return this.service.findOneById(id);
	}

	@Mutation()
	createStaffCategory(@Args('data') data: StaffCategoryCreateInput) {
		return this.service.create(data);
	}

	@Mutation()
	updateStaffCategory(
		@Args('id') id: string,
		@Args('data') data: StaffCategoryUpdateInput,
	) {
		return this.service.update(id, data);
	}

	@Mutation()
	deleteStaffCategory(@Args('id') id: string) {
		return this.service.delete(id);
	}

	private get service() {
		return this.categoryService;
	}
}
