import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { DateScalar } from './common/scalars/data.scalar';
import { AppService } from './app.service';
import { StudentModule } from './modules/student/student.module';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { StaffModule } from './modules/staff/staff.module';
import { InscriptionModule } from './modules/inscription/inscription.module';
import { ParentModule } from './modules/parent/parent.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		GraphQLModule.forRoot({
			typePaths: ['./**/*.graphql'],
			context: ({ req }) => ({ req }),
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
		ParentModule,
		AuthModule,
	],
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
		AuthService,
	],
})
export class AppModule {}
