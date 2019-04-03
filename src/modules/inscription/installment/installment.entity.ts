import { Entity, ManyToOne, Column } from 'typeorm';

import { Inscription } from '../inscription/inscription.entity';
import { InstallmentAbstract } from 'common/entities/installment.abstract';

@Entity('inscriptions_installments')
export class InscriptionInstallment extends InstallmentAbstract {
	@ManyToOne(type => Inscription, inscription => inscription.installments, {
		onDelete: 'CASCADE',
	})
	inscription: Inscription;

	@Column('boolean', {
		default: false,
	})
	paid: boolean;
}
