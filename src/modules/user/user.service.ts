import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserDTO, UserRO } from './user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async showAll(): Promise<UserRO[]> {
		const users = await this.repository.find();
		return users.map(user => user.toResponseObject(false));
	}

	async login(data: UserDTO): Promise<UserRO> {
		const { username, password } = data;
		const user = await this.repository.findOne({ username });
		if (!user || !(await user.comparePassword(password))) {
			throw new HttpException(
				'Invalid username or password',
				HttpStatus.BAD_REQUEST,
			);
		}
		return user.toResponseObject();
	}

	async register(data: UserDTO): Promise<UserRO> {
		const { username } = data;
		let user = await this.repository.findOne({ username });
		if (user) {
			throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}
		user = await this.repository.create(data);
		await this.repository.save(user);
		return user.toResponseObject();
	}

	private get repository(): Repository<User> {
		return this.userRepository;
	}
}
