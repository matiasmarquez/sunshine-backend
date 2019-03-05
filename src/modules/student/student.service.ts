import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Student } from './student.entity';
import { StudentCreateDTO } from './dto/student.create.dto';
import { CrudOperations } from 'common/services/crud.service';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService extends CrudOperations {
	constructor(
		@InjectRepository(StudentRepository)
		protected readonly studentRepository: StudentRepository,
	) {
		super(studentRepository);
	}

	async findAll(): Promise<Student[]> {
		return super.findAll();
	}

	async findOneById(id: string): Promise<Student> {
		return super.findOneById(id);
	}

	async create(data: StudentCreateDTO): Promise<Student> {
		return super.create(data);
	}

	async update(id: string, data: Partial<StudentCreateDTO>): Promise<Student> {
		return super.update(id, data);
	}

	async delete(id: string): Promise<Student> {
		return super.delete(id);
	}
}
