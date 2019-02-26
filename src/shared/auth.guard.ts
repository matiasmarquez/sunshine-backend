import {
	Injectable,
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { request } from 'http';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const auth = req.headers.authorization;
		if (!auth) {
			return false;
		}
		req.user = await this.validateToken(auth);
		return true;
	}

	async validateToken(auth: string) {
		if (auth.split(' ')[0] !== 'Bearer') {
			throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
		}
		const token = auth.split(' ')[1];
		try {
			const decoded = await jwt.verify(token, process.env.SECRET);
			return decoded;
		} catch (err) {
			const message = `Token error: ${err.message || err.name}`;
			throw new HttpException(message, HttpStatus.FORBIDDEN);
		}
	}
}
