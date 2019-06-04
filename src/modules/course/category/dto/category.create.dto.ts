import { IsString, IsNotEmpty } from 'class-validator';
import { CourseCategoryCreateInput } from 'graphql.schema';

export class CourseCategoryCreateDTO extends CourseCategoryCreateInput {
	@IsString()
	@IsNotEmpty()
	name: string;
}
