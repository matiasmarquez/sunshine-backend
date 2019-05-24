import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'varchar',
		unique: true,
	})
	username: string;

	@Column({ type: 'varchar' })
	name: string;

	@Column({ type: 'varchar' })
	lastName: string;

	@Column('varchar')
	password: string;

	@CreateDateColumn()
	created: Date;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
