import { Entity, ManyToOne } from 'typeorm';

import { InstallmentAbstract } from 'src/abstract/installment.abstract';
import { Inscription } from './inscription.entity';

@Entity('inscriptions_installments')
export class InscriptionInstallment extends InstallmentAbstract {
	@ManyToOne(type => Inscription, inscription => inscription.installments)
	inscription: Inscription;
}
