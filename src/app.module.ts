import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { DateScalar } from './common/scalars/data.scalar';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/student/student.module';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { StaffModule } from './modules/staff/staff.module';
import { InscriptionModule } from './modules/inscription/inscription.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		GraphQLModule.forRoot({
			typePaths: ['./**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.schema.ts'),
				outputAs: 'class',
			},
		}),
		StudentModule,
		UserModule,
		CourseModule,
		StaffModule,
		InscriptionModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: HttpErrorFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
		DateScalar,
	],
})
export class AppModule {}
