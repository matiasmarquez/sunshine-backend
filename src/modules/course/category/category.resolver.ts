import {
	Resolver,
	Query,
	Args,
	Mutation,
	ResolveProperty,
	Parent,
} from '@nestjs/graphql';
import { UsePipes } from '@nestjs/common';

import { ValidationPipe } from 'shared/validation.pipe';

import { CourseService } from '../course/course.service';
import { CourseCategoryService } from './category.service';
import { CourseCategoryCreateDTO } from './dto/category.create.dto';
import { CourseCategoryUpdateInput } from 'graphql.schema';

@Resolver('CourseCategory')
export class CourseCategoryResolver {
	constructor(
		private readonly categoryService: CourseCategoryService,
		private readonly courseService: CourseService,
	) {}

	@Query()
	courseCategories() {
		return this.service.findAll();
	}

	@Query()
	courseCategory(@Args('id') id: string) {
		return this.service.findOneById(id);
	}

	@Mutation()
	@UsePipes(new ValidationPipe())
	createCourseCategory(@Args('data') data: CourseCategoryCreateDTO) {
		return this.service.create(data);
	}

	@Mutation()
	updateCourseCategory(
		@Args('id') id: string,
		@Args('data') data: CourseCategoryUpdateInput,
	) {
		return this.service.update(id, data);
	}

	@Mutation()
	deleteCourseCategory(@Args('id') id: string) {
		return this.service.delete(id);
	}

	@ResolveProperty('courses')
	async courses(@Parent() category) {
		const { id } = category;
		return await this.courseService.findByCategory(id);
	}

	private get service(): CourseCategoryService {
		return this.categoryService;
	}
}
