import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
	CourseInstallment,
	InscriptionInstallmentCreateInput,
} from 'graphql.schema';

import { InscriptionInstallment } from './installment.entity';
import { InscriptionInstallmentRepository } from './installment.repository';

@Injectable()
export class InstallmentService {
	constructor(
		@InjectRepository(InscriptionInstallmentRepository)
		protected readonly installmentRepository: InscriptionInstallmentRepository,
	) {}

	createMany(
		installments:
			| CourseInstallment[]
			| InscriptionInstallmentCreateInput[]
			| [],
	): InscriptionInstallment[] | [] {
		let out = [];
		if (installments.length === 0) {
			return out;
		}
		for (let installment of installments) {
			out.push(this.create(<any>installment));
		}
		return out;
	}

	create(
		installment: CourseInstallment | InscriptionInstallmentCreateInput,
	): InscriptionInstallment {
		return this.repository.create(installment);
	}

	protected get repository(): InscriptionInstallmentRepository {
		return this.installmentRepository;
	}
}
