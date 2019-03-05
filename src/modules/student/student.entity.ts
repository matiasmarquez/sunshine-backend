import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeUpdate,
} from 'typeorm';

@Entity('students')
export class Student {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	name: string;

	@Column('varchar')
	lastName: string;

	@CreateDateColumn()
	created: Date;

	@UpdateDateColumn()
	updated: Date;
}
