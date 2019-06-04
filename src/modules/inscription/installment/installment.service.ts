import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InscriptionInstallmentRepository } from './installment.repository';
import { InscriptionInstallment } from 'modules/inscription/installment/installment.entity';
import { InscriptionInstallmentCreateDTO } from 'modules/inscription/installment/dto/installment.create.dto';
import { Inscription } from 'modules/inscription/inscription/inscription.entity';

@Injectable()
export class InstallmentService {
	constructor(
		@InjectRepository(InscriptionInstallmentRepository)
		protected readonly installmentRepository: InscriptionInstallmentRepository,
	) {}

	async createMany(
		array: InscriptionInstallmentCreateDTO[],
	): Promise<InscriptionInstallment[]> {
		const installments = array.map(
			async (installment: InscriptionInstallmentCreateDTO) => {
				return await this.create(installment);
			},
		);
		return await Promise.all(installments);
	}

	async create(
		data: InscriptionInstallmentCreateDTO,
	): Promise<InscriptionInstallment> {
		const { inscription } = data;
		if (inscription) {
			return this.repository.create({ ...data, inscription });
		}
		return this.repository.create(data);
	}

	async updateMany(
		inscription: Inscription,
		array: InscriptionInstallmentCreateDTO[],
	) {
		const installments = array.map(
			(installment: InscriptionInstallmentCreateDTO) => {
				return this.update(inscription, installment);
			},
		);
		return await Promise.all(installments);
	}

	async update(
		inscription: Inscription,
		data: InscriptionInstallmentCreateDTO,
	) {
		const created = await this.create({ ...data, inscription });
		return created;
	}

	protected get repository(): InscriptionInstallmentRepository {
		return this.installmentRepository;
	}
}
