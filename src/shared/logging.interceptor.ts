import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(ctx: ExecutionContext, call$: Observable<any>): Observable<any> {
		const req = ctx.switchToHttp().getRequest();
		if (!req) {
			return this.getGraphqlPipe(ctx, call$);
		} else {
			return this.getHttpPipe(req, ctx, call$);
		}
	}

	private getGraphqlPipe(ctx: ExecutionContext, call$: Observable<any>) {
		const graphqlCtx: any = GqlExecutionContext.create(ctx);
		const resolver = graphqlCtx.constructorRef.name;
		const info = graphqlCtx.getInfo();

		const now = Date.now();

		return call$.pipe(
			tap(() =>
				Logger.log(
					`${info.parentType} "${info.fieldName}" ${Date.now() - now}ms`,
					resolver,
				),
			),
		);
	}

	private getHttpPipe(req: any, ctx: ExecutionContext, call$: Observable<any>) {
		const method = req.method;
		const url = req.url;
		const now = Date.now();

		if (!method) {
			return call$;
		}

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
