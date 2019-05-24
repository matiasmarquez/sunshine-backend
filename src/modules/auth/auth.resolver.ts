import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserService } from 'modules/user/user.service';

@Resolver('Auth')
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query()
	@UseGuards(AuthGuard)
	me(@Context('req') req) {
		return req.user;
	}

	@Mutation()
	login(
		@Args('username') username: string,
		@Args('password') password: string,
	) {
		return this.authService.login(username, password);
	}
}
