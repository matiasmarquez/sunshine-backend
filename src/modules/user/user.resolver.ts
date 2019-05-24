import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserCreateInput, UserUpdateInput } from 'graphql.schema';

@Resolver('User')
export class UserResolver {
	constructor(private userService: UserService) {}

	@Query()
	users() {
		return this.service.find();
	}

	@Query()
	user(@Args('id') id: string) {
		return this.service.findOneById(id);
	}

	@Mutation()
	createUser(@Args('data') data: UserCreateInput) {
		return this.service.create(data);
	}

	@Mutation()
	updateUser(@Args('id') id: string, @Args('data') data: UserUpdateInput) {
		return this.service.update(id, data);
	}

	@Mutation()
	deleteUser(@Args('id') id: string) {
		return this.service.delete(id);
	}

	private get service(): UserService {
		return this.userService;
	}
}
