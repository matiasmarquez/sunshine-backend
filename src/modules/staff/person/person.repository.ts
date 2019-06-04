import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';

import { Person } from './person.entity';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
	public countAll(): Promise<Number> {
		const qb = this.qb;
		return qb.getCount();
	}

	private get qb(): SelectQueryBuilder<Person> {
		return this.createQueryBuilder('person');
	}
}
