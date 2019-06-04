import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './user.entity';

import { CrudOperations } from 'common/services/crud.service';
import { UserCreateInput, UserUpdateInput } from 'graphql.schema';
import { AuthService } from 'modules/auth/auth.service';

@Injectable()
export class UserService extends CrudOperations {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {
		super(userRepository);
	}

	find(): Promise<User[]> {
		return super.findAll();
	}

	findOneById(id: string): Promise<User> {
		return super.findOneById(id);
	}

	async findOneByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findOne({ username });
		return user;
	}

	async create(data: UserCreateInput): Promise<User> {
		return super.create(data);
	}

	async update(id: string, data: UserUpdateInput): Promise<User> {
		let { password, ...rest } = data;
		if (password === '') {
			return super.update(id, { ...rest });
		}
		const toUpdate = await this.findOneById(id);
		if (!(await bcrypt.compare(password, toUpdate.password))) {
			password = await bcrypt.hash(password, 10);
			data.password = password;
		}
		const updated = Object.assign(toUpdate, data);
		const entity = await this.userRepository.save(updated);
		return entity;
	}

	async delete(id: string): Promise<User> {
		return super.delete(id);
	}
}
