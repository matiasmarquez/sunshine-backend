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

	findNotPayed(): Promise<Inscription[]> {
		return this.inscriptionRepository.findNotPayed();
	}

	countAll(): Promise<Number> {
		return this.inscriptionRepository.countAll();
	}

	async create(data: any) {
		const { courseId, studentId, installments: installmentsArray } = data;
		const course = await this.courseService.findOneById(courseId);
		const student = await this.studentService.findOneById(studentId);
		let installments = [];
		if (installmentsArray && installmentsArray.length > 0) {
			installments = await this.installmentService.createMany(
				installmentsArray,
			);
		}
		const inscription = await super.create({
			course,
			student,
			installments,
			state: Inscription.IN_PROGRESS_STATE,
		});
		return inscription;
	}

	async update(id: string, data: InscriptionUpdateInput) {
		let dataOpc = {};
		const { courseId, studentId, installments: installmentsArray } = data;
		if (courseId) {
			const course = await this.courseService.findOneById(courseId);
			dataOpc = { course };
		}
		if (studentId) {
			const student = await this.studentService.findOneById(studentId);
			dataOpc = { ...dataOpc, student };
		}
		if (installmentsArray && installmentsArray.length > 0) {
			const inscription = await this.findOneById(id);
			await this.inscriptionRepository.removeInstallments(id);
			const installments = await this.installmentService.updateMany(
				inscription,
				installmentsArray,
			);
			dataOpc = { ...dataOpc, installments };
		}
		return super.update(id, { ...data, ...dataOpc });
	}

	delete(id: string): Promise<Inscription> {
		return super.delete(id);
	}
}
