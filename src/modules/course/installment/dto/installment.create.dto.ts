import { CourseInstallmentCreateInput } from 'graphql.schema';
import { Course } from 'modules/course/course/course.entity';

export class CourseInstallmentCreateDTO extends CourseInstallmentCreateInput {
	course?: Course;
}
