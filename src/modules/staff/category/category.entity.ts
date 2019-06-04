import {
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	Column,
	CreateDateColumn,
} from 'typeorm';

import { Person } from '../person/person.entity';

@Entity('staff_categories')
export class StaffCategory {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToMany(type => Person, person => person.category)
	people: Person[];

	@Column('varchar')
	name: string;

	@Column('text', {
		nullable: true,
	})
	description: string;

	@CreateDateColumn()
	created: Date;
}
