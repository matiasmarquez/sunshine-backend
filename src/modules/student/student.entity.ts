import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';

import { Parent } from '../parent/parent.entity';

@Entity('students')
export class Student {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToMany(type => Parent, parent => parent.student, {
		cascade: true,
		eager: true,
	})
	parents: Parent[];

	@Column('varchar')
	name: string;

	@Column('varchar')
	lastName: string;

	@Column('varchar')
	address: string;

	@Column('varchar', {
		nullable: true,
	})
	phone: string;

	@Column('varchar', {
		nullable: true,
	})
	email: string;

	@Column('varchar', {
		nullable: true,
	})
	school: string;

	@Column('varchar', {
		nullable: true,
	})
	degree: string;

	@CreateDateColumn()
	created: Date;

	@UpdateDateColumn()
	updated: Date;
}
