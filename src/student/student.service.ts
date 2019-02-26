import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from './student.entity';
import { StudentDTO } from './student.dto';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(Student)
		private studentRepository: Repository<Student>,
	) {}

	async showAll() {
		return await this.studentRepository.find();
	}

	async create(data: StudentDTO) {
		const student = await this.studentRepository.create(data);
		await this.studentRepository.save(student);
		return student;
	}

	async read(id: string) {
		return await this.studentRepository.findOne({ id });
	}

	async update(id: string, data: Partial<StudentDTO>) {
		await this.studentRepository.update({ id }, data);
		return await this.studentRepository.findOne({ id });
	}

	async destroy(id: string) {
		await this.studentRepository.delete({ id });
		return { id };
	}
}
