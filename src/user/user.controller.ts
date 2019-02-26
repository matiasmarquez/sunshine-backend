import {
	Controller,
	Post,
	Get,
	Body,
	UsePipes,
	UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';

import { UserService } from './user.service';
import { UserDTO, UserRO } from './user.dto';
import { User } from './user.decorator';

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	@Get('api/user')
	@UseGuards(new AuthGuard())
	showAllUsers(@User() user: Partial<UserRO>) {
		console.log(user);
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
