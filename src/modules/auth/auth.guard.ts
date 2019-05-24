import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Inject,
} from '@nestjs/common';
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard extends AuthGuardPassport('jwt') implements CanActivate {
	constructor(
		@Inject(AuthService)
		private readonly authService: AuthService,
	) {
		super();
	}

	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}
}
