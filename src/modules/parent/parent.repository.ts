import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { Parent } from './parent.entity';

@EntityRepository(Parent)
export class ParentRepository extends Repository<Parent> {
	public findAll() {
		const qb = this.qb;
		this.addJoins(qb);
		this.addOrder(qb);
		return qb.getMany();
	}

	public findOneById(id: string) {
		const qb = this.qb;
		this.addJoins(qb);
		this.addOrder(qb);
		return qb.where('parent.id = :id', { id }).getOne();
	}

	private addJoins(qb: SelectQueryBuilder<Parent>): SelectQueryBuilder<Parent> {
		qb.leftJoinAndSelect('parent.student', 'student');
		return qb;
	}

	private addOrder(qb: SelectQueryBuilder<Parent>): SelectQueryBuilder<Parent> {
		qb.orderBy({ 'parent.name': 'DESC' });
		return qb;
	}

	private get qb(): SelectQueryBuilder<Parent> {
		return this.createQueryBuilder('parent');
	}
}
