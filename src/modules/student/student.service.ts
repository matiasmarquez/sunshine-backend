import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Student } from './student.entity';
import { StudentCreateDTO } from './dto/student.create.dto';
import { CrudOperations } from 'common/services/crud.service';
import { StudentRepository } from './student.repository';

import { ParentService } from 'modules/parent/parent.service';

@Injectable()
export class StudentService extends CrudOperations {
	constructor(
		@InjectRepository(StudentRepository)
		protected readonly studentRepository: StudentRepository,
		@Inject(ParentService)
		protected readonly parentService: ParentService,
	) {
		super(studentRepository);
	}

	async find(): Promise<Student[]> {
		return await this.studentRepository.findAll();
	}

	async findOneById(id: string): Promise<Student> {
		return await this.studentRepository.findOneById(id);
	}

	countAll(): Promise<Number> {
		return this.studentRepository.countAll();
	}

	async create(data: StudentCreateDTO): Promise<Student> {
		const { parents: parentsArray } = data;
		let parents = [];
		if (parentsArray && parentsArray.length > 0) {
			parents = await this.parentService.createMany(parentsArray);
		}
		return super.create({ ...data, parents });
	}

	async update(id: string, data: Partial<StudentCreateDTO>): Promise<Student> {
		let dataOpc = {};
		const { parents: parentsArray } = data;
		if (parentsArray && parentsArray.length > 0) {
			const student = await this.findOneById(id);
			await this.studentRepository.removeParents(student);
			const parents = await this.parentService.updateMany(
				student,
				parentsArray,
			);
			dataOpc = { parents };
		}
		return super.update(id, { ...data, ...dataOpc });
	}

	async delete(id: string): Promise<Student> {
		return super.delete(id);
	}
}
