import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';

import { Course } from './course.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
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
		return qb.where('course.id = :id', { id }).getOne();
	}

	private addJoins(qb: SelectQueryBuilder<Course>): SelectQueryBuilder<Course> {
		qb.leftJoinAndSelect('course.installments', 'installments')
			.leftJoinAndSelect('course.staff', 'staff')
			.leftJoinAndSelect('course.category', 'category');
		return qb;
	}

	private addOrder(qb: SelectQueryBuilder<Course>): SelectQueryBuilder<Course> {
		qb.orderBy({
			'course.name': 'DESC',
			'installments.date': 'ASC',
		});
		return qb;
	}

	private get qb(): SelectQueryBuilder<Course> {
		return this.createQueryBuilder('course');
	}
}
