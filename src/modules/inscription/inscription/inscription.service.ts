import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudOperations } from 'common/services/crud.service';

import { Inscription } from './inscription.entity';
import { InscriptionRepository } from './inscription.repository';

import { InstallmentService } from '../installment/installment.service';

import { CourseService } from 'modules/course/course/course.service';
import { StudentService } from 'modules/student/student.service';
import { InscriptionUpdateInput } from 'graphql.schema';

@Injectable()
export class InscriptionService extends CrudOperations {
	constructor(
		@InjectRepository(InscriptionRepository)
		protected readonly inscriptionRepository: InscriptionRepository,
		@Inject(InstallmentService)
		protected readonly installmentService: InstallmentService,
		@Inject(CourseService)
		protected readonly courseService: CourseService,
		@Inject(StudentService)
		protected readonly studentService: StudentService,
	) {
		super(inscriptionRepository);
	}

	findAll(): Promise<Inscription[]> {
		return this.inscriptionRepository.findAll();
	}

	findOneById(id: string): Promise<Inscription> {
		return super.findOneById(id);
	}

	async create(data: any) {
		const { courseId, studentId } = data;
		const course = await this.courseService.findOneById(courseId);
		const student = await this.studentService.findOneById(studentId);
		const installments = await this.installmentService.createMany(
			course.installments,
		);
		const price = course.price;
		const inscription = await super.create({
			course,
			student,
			installments,
			price,
			state: Inscription.IN_PROGRESS_STATE,
		});
		return inscription;
	}

	// No permitir actualizar cuando ya se realizo un pago o se pago completamente.
	async update(id: string, data: InscriptionUpdateInput) {
		const { price, installments: installmentsArray } = data;
		if (installmentsArray) {
			//this.inscriptionRepository.removeInstallments(id);
			const installments = this.installmentService.createMany(
				installmentsArray,
			);
			console.log(installments);
		}
	}

	delete(id: string): Promise<Inscription> {
		return super.delete(id);
	}
}
