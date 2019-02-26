import { Controller, Post, Get, Body, UsePipes } from '@nestjs/common';

import { ValidationPipe } from 'src/shared/validation.pipe';

import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	@Get('api/user')
	showAllUsers() {
		return this.service.showAll();
	}

	@Post('login')
	@UsePipes(new ValidationPipe())
	login(@Body() data: UserDTO) {
		return this.service.login(data);
	}

	@Post('register')
	@UsePipes(new ValidationPipe())
	register(@Body() data: UserDTO) {
		return this.service.register(data);
	}

	private get service(): UserService {
		return this.userService;
	}
}
