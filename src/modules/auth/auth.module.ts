import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: process.env.SECRET,
			signOptions: { expiresIn: '7d' },
		}),
		UserModule,
	],
	providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
