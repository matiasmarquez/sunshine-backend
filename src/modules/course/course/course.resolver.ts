import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { CourseCreateDTO } from './dto/course.create.dto';
import { CourseUpdateInput } from 'graphql.schema';

@Resolver()
export class CourseResolver {
	constructor(private readonly courseService: CourseService) {}

	@Query()
	courses() {
		return this.service.findAll();
	}

	@Query()
	course(@Args('id') id: string) {
		return this.service.findOneById(id);
	}

	@Query()
	countCourses() {
		return this.service.countAll();
	}

	@Mutation()
	createCourse(@Args('data') data: CourseCreateDTO) {
		return this.service.create(data);
	}

	@Mutation()
	updateCourse(@Args('id') id: string, @Args('data') data: CourseUpdateInput) {
		return this.service.update(id, data);
	}

	@Mutation()
	deleteCourse(@Args('id') id: string) {
		return this.service.delete(id);
	}

	private get service() {
		return this.courseService;
	}
}
