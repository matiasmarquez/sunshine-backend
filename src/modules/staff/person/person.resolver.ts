import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { StaffPersonService } from './person.service';
import { StaffPersonCreateInput, StaffPersonUpdateInput } from 'graphql.schema';

@Resolver()
export class StaffPersonResolver {
	constructor(
		@Inject(StaffPersonService)
		private readonly personService: StaffPersonService,
	) {}

	@Query()
	staffPeople() {
		return this.service.findAll();
	}

	@Query()
	staffPerson(@Args('id') id: string) {
		return this.service.findOneById(id);
	}

	@Mutation()
	createStaffPerson(@Args('data') data: StaffPersonCreateInput) {
		return this.service.create(data);
	}

	@Mutation()
	updateStaffPerson(
		@Args('id') id: string,
		@Args('data') data: StaffPersonUpdateInput,
	) {
		return this.service.update(id, data);
	}

	@Mutation()
	deleteStaffPerson(@Args('id') id: string) {
		return this.service.delete(id);
	}

	private get service() {
		return this.personService;
	}
}
