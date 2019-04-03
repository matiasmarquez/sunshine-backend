import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Inscription } from './inscription/inscription.entity';
import { InscriptionRepository } from './inscription/inscription.repository';
import { InscriptionService } from './inscription/inscription.service';
import { InscriptionResolver } from './inscription/inscription.resolver';

import { InstallmentService } from './installment/installment.service';
import { InscriptionInstallment } from './installment/installment.entity';

import { PaystateService } from './paystate/paystate.service';
import { InscriptionPayState } from './paystate/paystates.entity';

import { CourseModule } from 'modules/course/course.module';
import { StudentModule } from 'modules/student/student.module';
import { InscriptionInstallmentRepository } from './installment/installment.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Inscription,
			InscriptionRepository,
			InscriptionInstallment,
			InscriptionInstallmentRepository,
			InscriptionPayState,
		]),
		CourseModule,
		StudentModule,
	],
	providers: [
		InscriptionService,
		InscriptionResolver,
		InstallmentService,
		PaystateService,
	],
})
export class InscriptionModule {}
