import { IsString } from 'class-validator';

export class StudentDTO {
	@IsString()
	name: string;

	@IsString()
	lastName: string;
}
