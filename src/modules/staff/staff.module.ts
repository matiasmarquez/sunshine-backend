import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from 'modules/course/course.module';

import { Person } from './person/person.entity';
import { StaffPersonService } from './person/person.service';
import { StaffPersonResolver } from './person/person.resolver';

import { StaffCategory } from './category/category.entity';
import { StaffCategoryService } from './category/category.service';
import { StaffCategoryResolver } from './category/category.resolver';
import { PersonRepository } from './person/person.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([Person, PersonRepository, StaffCategory]),
		CourseModule,
	],
	providers: [
		StaffPersonService,
		StaffPersonResolver,
		StaffCategoryService,
		StaffCategoryResolver,
	],
})
export class StaffModule {}
