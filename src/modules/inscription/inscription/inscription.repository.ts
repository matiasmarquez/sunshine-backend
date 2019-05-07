import {
	Repository,
	EntityRepository,
	SelectQueryBuilder,
	DeleteResult,
} from 'typeorm';

import { Inscription } from './inscription.entity';
import { InscriptionInstallment } from '../installment/installment.entity';

@EntityRepository(Inscription)
export class InscriptionRepository extends Repository<Inscription> {
	public findAll(): Promise<Inscription[]> {
		const qb = this.qb;
		this.addJoins(qb);
		this.addOrder(qb);
		return qb.getMany();
	}

	public findNotPayed(): Promise<Inscription[]> {
		const qb = this.qb;
		this.addJoins(qb);
		this.addOrder(qb);
		const date = new Date();
		const month = date.getMonth() + 1;
		qb.andWhere('MONTH(installments.date) <= :month', { month });
		qb.andWhere('installments.paid = :paid', { paid: false });
		return qb.getMany();
	}

	public removeInstallments(inscriptionId): Promise<DeleteResult> {
		const qb = this.qb;
		return qb
			.delete()
			.from(InscriptionInstallment)
			.where('inscriptionId = :id', { id: inscriptionId })
			.execute();
	}

	public countAll(): Promise<Number> {
		const qb = this.qb;
		return qb.getCount();
	}

	private addJoins(
		qb: SelectQueryBuilder<Inscription>,
	): SelectQueryBuilder<Inscription> {
		qb.leftJoinAndSelect('inscription.course', 'course')
			.leftJoinAndSelect('inscription.student', 'student')
			.leftJoinAndSelect('inscription.installments', 'installments');
		return qb;
	}

	private addOrder(
		qb: SelectQueryBuilder<Inscription>,
	): SelectQueryBuilder<Inscription> {
		qb.orderBy({
			'student.name': 'DESC',
			'installments.date': 'ASC',
		});
		return qb;
	}

	private get qb(): SelectQueryBuilder<Inscription> {
		return this.createQueryBuilder('inscription');
	}
}
