import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { InscriptionInstallment } from './installment.entity';
import { Inscription } from '../inscription/inscription.entity';

@EntityRepository(InscriptionInstallment)
export class InscriptionInstallmentRepository extends Repository<
	InscriptionInstallment
> {
	findFirstToPay(inscription: Inscription): Promise<InscriptionInstallment> {
		const qb = this.qb;
		this.addJoins(qb);
		this.addOrder(qb);
		return qb
			.where('installment.paid = :paid', { paid: false })
			.andWhere('inscription.id = :inscriptionId', {
				inscriptionId: inscription.id,
			})
			.getOne();
	}

	private addJoins(
		qb: SelectQueryBuilder<InscriptionInstallment>,
	): SelectQueryBuilder<InscriptionInstallment> {
		qb.leftJoinAndSelect('installment.inscription', 'inscription');
		return qb;
	}

	private addOrder(
		qb: SelectQueryBuilder<InscriptionInstallment>,
	): SelectQueryBuilder<InscriptionInstallment> {
		qb.orderBy({
			'installment.number': 'ASC',
		});
		return qb;
	}

	private get qb(): SelectQueryBuilder<InscriptionInstallment> {
		return this.createQueryBuilder('installment');
	}
}
