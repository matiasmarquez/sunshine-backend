import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'modules/user/user.entity';
import * as bcrypt from 'bcryptjs';
import { Auth } from 'graphql.schema';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async login(username: string, password: string): Promise<Auth> {
		const user = await this.userService.findOneByUsername(username);
		if (!user) {
			throw new HttpException('Invalid username', HttpStatus.BAD_REQUEST);
		}
		if (!(await this.comparePassword(user, password))) {
			throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
		}
		const token = await this.jwtService.sign({
			username,
		});
		return {
			username,
			token,
		};
	}

	async comparePassword(user: User, attempt: string) {
		return await bcrypt.compare(attempt, user.password);
	}

	async validateToken(token: string) {
		console.log(token);
		return this.jwtService.verify(token);
	}

	async validateUser(payload): Promise<any> {
		return await this.userService.findOneByUsername(payload.username);
	}
}
