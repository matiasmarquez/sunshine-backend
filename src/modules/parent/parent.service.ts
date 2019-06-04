import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from './parent.entity';
import { ParentCreateInput, ParentType } from 'graphql.schema';

import { Student } from 'modules/student/student.entity';
import { ParentCreateDTO } from './dto/parent.create.dto';
import { ParentRepository } from './parent.repository';

@Injectable()
export class ParentService {
	constructor(
		@InjectRepository(Parent)
		protected readonly parentRepository: ParentRepository,
	) {}

	findAll(): Promise<Parent[]> {
		return this.repository.findAll();
	}

	findAllTypes(): ParentType[] {
		return Parent.types;
	}

	findOneById(id: string): Promise<Parent> {
		return this.repository.findOneById(id);
	}

	async createMany(array: ParentCreateInput[]): Promise<Parent[]> {
		const parents = array.map(async (parent: ParentCreateInput) => {
			return await this.create(parent);
		});
		return await Promise.all(parents);
	}

	async create(data: ParentCreateDTO): Promise<Parent> {
		const { student } = data;
		if (student) {
			return this.repository.create({ ...data, student });
		}
		return this.repository.create(data);
	}

	async updateMany(student: Student, array: Partial<ParentCreateInput[]>) {
		const parents = array.map((parent: ParentCreateInput) => {
			return this.update(student, parent);
		});
		return await Promise.all(parents);
	}

	async update(student: Student, data: ParentCreateInput): Promise<Parent> {
		const created = await this.create({ ...data, student });
		return created;
	}

	async delete(id: string) {}

	private get repository() {
		return this.parentRepository;
	}
}
