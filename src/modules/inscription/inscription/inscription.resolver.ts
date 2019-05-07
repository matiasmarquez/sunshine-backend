import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { InscriptionService } from './inscription.service';
import { InscriptionCreateInput, InscriptionUpdateInput } from 'graphql.schema';

@Resolver()
export class InscriptionResolver {
	constructor(
		@Inject(InscriptionService)
		private readonly inscriptionService: InscriptionService,
	) {}

	@Query()
	inscriptions() {
		return this.service.findAll();
	}

	@Query()
	inscriptionsNotPayed() {
		return this.service.findNotPayed();
	}

	@Query()
	inscription(@Args('id') id: string) {
		return this.service.findOneById(id);
	}

	@Query()
	countInscriptions() {
		return this.service.countAll();
	}

	@Mutation()
	createInscription(@Args('data') data: InscriptionCreateInput) {
		return this.service.create(data);
	}

	@Mutation()
	updateInscription(
		@Args('id') id: string,
		@Args('data') data: InscriptionUpdateInput,
	) {
		return this.service.update(id, data);
	}

	@Mutation()
	deleteInscription(@Args('id') id: string) {
		return this.service.delete(id);
	}

	private get service() {
		return this.inscriptionService;
	}
}
