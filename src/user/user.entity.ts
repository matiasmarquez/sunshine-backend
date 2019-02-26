import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'varchar',
		unique: true,
	})
	username: string;

	@Column('varchar')
	password: string;

	@CreateDateColumn()
	created: Date;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	toResponseObject(showToken: boolean = true): UserRO {
		const { id, created, username, token } = this;
		const responseObject: UserRO = { id, created, username };
		if (showToken) {
			responseObject.token = token;
		}
		return responseObject;
	}

	async comparePassword(attempt: string) {
		return await bcrypt.compare(attempt, this.password);
	}

	private get token() {
		const { id, username } = this;
		return jwt.sign(
			{
				id,
				username,
			},
			process.env.SECRET,
			{ expiresIn: '7d' },
		);
	}
}
