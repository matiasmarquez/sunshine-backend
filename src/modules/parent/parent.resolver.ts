import { Resolver, Query, Args } from '@nestjs/graphql';
import { ParentService } from './parent.service';

@Resolver()
export class ParentResolver {
	constructor(private readonly parentService: ParentService) {}

	@Query()
	parents() {
		return this.service.findAll();
	}

	@Query()
	parent(@Args('id') id: string) {
		return this.service.findOneById(id);
	}

	@Query()
	parentTypes() {
		return this.service.findAllTypes();
	}

	private get service() {
		return this.parentService;
	}
}
