import { IsString, IsNotEmpty } from 'class-validator';
import { StudentCreateInput } from 'graphql.schema';

export class StudentCreateDTO extends StudentCreateInput {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;
}
