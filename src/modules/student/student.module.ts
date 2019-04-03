import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { StudentRepository } from './student.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Student, StudentRepository])],
	providers: [StudentService, StudentResolver],
	exports: [StudentService],
})
export class StudentModule {}
