import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InscriptionPayState } from './paystates.entity';
import { Inscription } from '../inscription/inscription.entity';
import { InscriptionInstallmentRepository } from '../installment/installment.repository';
import { CrudOperations } from 'common/services/crud.service';

@Injectable()
export class PaystateService extends CrudOperations {
	constructor(
		@InjectRepository(InscriptionPayState)
		protected readonly paystateRepository: Repository<InscriptionPayState>,
		@InjectRepository(InscriptionInstallmentRepository)
		protected readonly installmentRepository: InscriptionInstallmentRepository,
	) {
		super(paystateRepository);
	}

	public async create(inscription: Inscription) {
		let data = null;
		if (inscription.installments.length === 0) {
			data = this.getDataWithoutInstallments(inscription);
		} else {
			data = await this.getDataWithInstallments(inscription);
		}
		return data;
	}

	private getDataWithoutInstallments(inscription: Inscription) {
		return {
			inscription,
			state: InscriptionPayState.TO_PAY_STATE,
		};
	}

	private async getDataWithInstallments(inscription: Inscription) {
		const installment = await this.installmentRepository.findFirstToPay(
			inscription,
		);
		return {
			inscription,
			installment,
			state: InscriptionPayState.TO_PAY_STATE,
		};
	}
}
