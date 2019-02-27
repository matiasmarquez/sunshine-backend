import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import { Inscription } from './inscription.entity';
import { InscriptionInstallment } from './installment.entity';

@Entity('inscriptions_pay_states')
export class InscriptionPayState {
	static readonly TO_PAY_STATE = 'to_pay';
	static readonly PAID_STATE = 'paid';
	static readonly FULL_PAID_STATE = 'full_paid';

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(type => Inscription, inscription => inscription.paystates)
	inscription: Inscription;

	@ManyToOne(type => InscriptionInstallment)
	installment: InscriptionInstallment;

	@Column('varchar')
	state: string;

	@Column('boolean')
	fullPayment: boolean;
}
