import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
} from 'typeorm';

import { Student } from 'modules/student/student.entity';

@Entity('parents')
export class Parent {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(type => Student, student => student.parents, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	student: Student;

	@Column('varchar')
	name: string;

	@Column('varchar')
	lastName: string;

	@Column('int')
	type: number;

	@Column('varchar', {
		nullable: true,
	})
	phone: string;

	@Column('text', {
		nullable: true,
	})
	comment: string;

	@CreateDateColumn()
	created: Date;

	public static get types() {
		return [
			{
				id: 1,
				type: 'Madre',
			},
			{
				id: 2,
				type: 'Padre',
			},
			{
				id: 3,
				type: 'Otro',
			},
		];
	}
}
