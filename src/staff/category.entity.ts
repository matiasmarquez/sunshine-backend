import {
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	Column,
	CreateDateColumn,
} from 'typeorm';

import { Person } from './person.entity';

@Entity('staff_people_categories')
export class PersonCategory {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToMany(type => Person, person => person.category)
	people: Person[];

	@Column('varchar')
	name: string;

	@Column('text')
	description: string;

	@CreateDateColumn()
	created: Date;
}
