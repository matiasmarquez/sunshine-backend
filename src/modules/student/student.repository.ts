import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { Student } from './student.entity';
import { Parent } from 'modules/parent/parent.entity';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
	public findAll(): Promise<Student[]> {
		const qb = this.qb;
		this.addOrder(qb);
		this.addJoins(qb);
		return qb.getMany();
	}

	public findOneById(id: string): Promise<Student> {
		const qb = this.qb;
		this.addOrder(qb);
		this.addJoins(qb);
		return qb.where('student.id = :id', { id }).getOne();
	}

	public removeParents(student: Student) {
		const qb = this.qb;
		qb.delete()
			.from(Parent)
			.where('studentId = :id', { id: student.id })
			.execute();
	}

	public countAll(): Promise<Number> {
		const qb = this.qb;
		return qb.getCount();
	}

	private addJoins(
		qb: SelectQueryBuilder<Student>,
	): SelectQueryBuilder<Student> {
		qb.leftJoinAndSelect('student.parents', 'parents');
		return qb;
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
