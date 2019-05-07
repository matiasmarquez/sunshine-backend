import { UsePipes } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { ValidationPipe } from 'shared/validation.pipe';

import { Student, StudentUpdateInput } from 'graphql.schema';
import { StudentCreateDTO } from './dto/student.create.dto';
import { StudentService } from './student.service';

@Resolver('Student')
export class StudentResolver {
	constructor(private studentService: StudentService) {}

	@Query()
	students(): Student[] | Promise<Student[]> {
		return this.service.find();
	}

	@Query()
	student(@Args('id') id: string): Student | Promise<Student> {
		return this.service.findOneById(id);
	}

	@Query()
	countStudents(): Promise<Number> {
		return this.service.countAll();
	}

	@Mutation()
	@UsePipes(new ValidationPipe())
	createStudent(
		@Args('data') student: StudentCreateDTO,
	): Student | Promise<Student> {
		return this.service.create(student);
	}

	@Mutation()
	updateStudent(
		@Args('id') id: string,
		@Args('data') student: StudentUpdateInput,
	): Student | Promise<Student> {
		return this.service.update(id, student);
	}

	@Mutation()
	deleteStudent(@Args('id') id: string): Student | Promise<Student> {
		return this.service.delete(id);
	}

	private get service(): StudentService {
		return this.studentService;
	}
}
