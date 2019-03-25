import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import { Inscription } from '../inscription/inscription.entity';
import { InscriptionInstallment } from '../installment/installment.entity';

@Entity('inscriptions_pay_states')
export class InscriptionPayState {
	static readonly TO_PAY_STATE = 'to_pay';
	static readonly PAID_STATE = 'paid';
	static readonly FULL_PAID_STATE = 'full_paid';

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(type => Inscription, inscription => inscription.payStates, {
		onDelete: 'CASCADE',
	})
	inscription: Inscription;

	@ManyToOne(type => InscriptionInstallment, {
		eager: true,
		nullable: true,
	})
	installment: InscriptionInstallment;

	@Column('varchar')
	state: string;

	@Column('boolean', {
		default: false,
	})
	fullPayment: boolean;
}
