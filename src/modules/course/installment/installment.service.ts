import { Injectable, Inject } from '@nestjs/common';
import { CourseInstallment } from './installment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseInstallmentCreateDTO } from './dto/installment.create.dto';
import { Course } from '../course/course.entity';

@Injectable()
export class InstallmentService {
	constructor(
		@InjectRepository(CourseInstallment)
		protected readonly installmentRepository: Repository<CourseInstallment>,
	) {}

	findAllByCourse(course: Course) {
		return this.repository.find({ where: { course }, relations: ['course'] });
	}

	findOneByCourseAndNumber(course: Course, number: number) {
		return this.repository.findOne({
			where: { course, number },
			relations: ['course'],
		});
	}

	async createMany(
		array: CourseInstallmentCreateDTO[],
	): Promise<CourseInstallment[]> {
		const installments = array.map(
			async (installment: CourseInstallmentCreateDTO) => {
				return await this.create(installment);
			},
		);
		return await Promise.all(installments);
	}

	async create(data: CourseInstallmentCreateDTO): Promise<CourseInstallment> {
		const { course } = data;
		if (course) {
			return this.repository.create({ ...data, course });
		}
		return this.repository.create(data);
	}

	async updateMany(course: Course, array: CourseInstallmentCreateDTO[]) {
		const installments = array.map(
			(installment: CourseInstallmentCreateDTO) => {
				return this.update(course, installment);
			},
		);
		return await Promise.all(installments);
	}

	async update(course: Course, data: CourseInstallmentCreateDTO) {
		const created = await this.create({ ...data, course });
		return created;
	}

	private get repository() {
		return this.installmentRepository;
	}
}
