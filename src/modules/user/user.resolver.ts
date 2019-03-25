import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
	constructor(private userService: UserService) {}

	@Query()
	users() {
		return this.service.showAll();
	}

	private get service(): UserService {
		return this.userService;
	}
}
