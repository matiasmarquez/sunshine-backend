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

	public removeInstallments(inscriptionId): Promise<DeleteResult> {
		const qb = this.qb;
		return qb
			.delete()
			.from(InscriptionInstallment)
			.where('inscriptionId = :id', { inscriptionId })
			.execute();
	}

	private addJoins(
		qb: SelectQueryBuilder<Inscription>,
	): SelectQueryBuilder<Inscription> {
		qb.leftJoinAndSelect('inscription.course', 'course')
			.leftJoinAndSelect('inscription.student', 'student')
			.leftJoinAndSelect('inscription.payStates', 'payStates')
			.leftJoinAndSelect('inscription.installments', 'installments')
			.leftJoinAndSelect('payStates.installment', 'payStatesInstallment');
		return qb;
	}

	private addOrder(
		qb: SelectQueryBuilder<Inscription>,
	): SelectQueryBuilder<Inscription> {
		qb.orderBy({
			'student.name': 'DESC',
			'installments.number': 'ASC',
		});
		return qb;
	}

	private get qb(): SelectQueryBuilder<Inscription> {
		return this.createQueryBuilder('inscription');
	}
}
