import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { Student } from './student.entity';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
	public findAll(): Promise<Student[]> {
		const qb = this.qb;
		this.addOrder(qb);
		return qb.getMany();
	}

	private addOrder(
		qb: SelectQueryBuilder<Student>,
	): SelectQueryBuilder<Student> {
		qb.orderBy({
			'student.name': 'ASC',
			'student.lastName': 'ASC',
		});
		return qb;
	}

	private get qb(): SelectQueryBuilder<Student> {
		return this.createQueryBuilder('student');
	}
}
