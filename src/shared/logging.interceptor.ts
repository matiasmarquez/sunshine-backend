import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(ctx: ExecutionContext, call$: Observable<any>): Observable<any> {
		const req = ctx.switchToHttp().getRequest();
		const method = req.method;
		const url = req.url;
		const now = Date.now();

		return call$.pipe(
			tap(() =>
				Logger.log(
					`${method} ${url} ${Date.now() - now}ms`,
					ctx.getClass().name,
				),
			),
		);
	}
}
