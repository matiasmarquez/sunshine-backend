import {
	Catch,
	ExceptionFilter,
	HttpException,
	ArgumentsHost,
	Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const req = ctx.getRequest();
		const res = ctx.getResponse();

		const status = exception.getStatus();

		const errorResponse = {
			code: status,
			timestamp: new Date().toLocaleTimeString(),
			path: req.url,
			method: req.method,
			message: exception.message.error || exception.message || null,
		};

		Logger.error(
			`${req.method} ${req.url}`,
			JSON.stringify(errorResponse),
			'ExceptionFilter',
		);

		res.status(status).json(errorResponse);
	}
}
