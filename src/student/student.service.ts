import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
		const student = await this.studentRepository.findOne({ id });
		if (!student) {
			this.throwNotFoundException();
		}
		return student;
	}

	async update(id: string, data: Partial<StudentDTO>) {
		const student = await this.studentRepository.findOne({ id });
		if (!student) {
			this.throwNotFoundException();
		}
		await this.studentRepository.update({ id }, data);
		return await this.studentRepository.findOne({ id });
	}

	async destroy(id: string) {
		const student = await this.studentRepository.findOne({ id });
		if (!student) {
			this.throwNotFoundException();
		}
		await this.studentRepository.delete({ id });
		return student;
	}

	throwNotFoundException() {
		throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
	}
}
