import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

const port = process.env.PORT || 8080;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: [
				'http://localhost:3000',
				'http://192.168.0.11:3000',
				'http://www.sunshine.com',
				'http://sunshine.com',
			],
		},
	});
	await app.listen(port);
	Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
