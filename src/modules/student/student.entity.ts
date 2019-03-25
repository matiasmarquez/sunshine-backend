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

	@CreateDateColumn()
	created: Date;

	@UpdateDateColumn()
	updated: Date;
}
