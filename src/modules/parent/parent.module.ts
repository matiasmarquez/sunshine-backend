import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Parent } from './parent.entity';
import { ParentRepository } from './parent.repository';
import { ParentResolver } from './parent.resolver';
import { ParentService } from './parent.service';

@Module({
	imports: [TypeOrmModule.forFeature([Parent, ParentRepository])],
	providers: [ParentService, ParentResolver],
	exports: [ParentService],
})
export class ParentModule {}
