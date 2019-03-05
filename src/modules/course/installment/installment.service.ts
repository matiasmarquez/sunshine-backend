import { Injectable } from '@nestjs/common';
import { CrudOperations } from 'common/services/crud.service';
import { CourseInstallmentCreateInput } from 'graphql.schema';
import { CourseInstallment } from './installment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstallmentService extends CrudOperations {
	constructor(
		@InjectRepository(CourseInstallment)
		protected readonly installmentRepository: Repository<CourseInstallment>,
	) {
		super(installmentRepository);
	}

	async createFromArray(array: CourseInstallmentCreateInput[]) {
		const installments = array.map(
			(installment: CourseInstallmentCreateInput) => {
				return this.installmentRepository.create(installment);
			},
		);
		return installments;
	}
}
