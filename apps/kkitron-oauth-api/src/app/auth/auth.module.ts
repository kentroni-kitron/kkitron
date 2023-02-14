import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersService } from '../resources/users/users.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.KKITRON_OAUTH_JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.JWT_ACCESS_EXPIRES_SECONDS) },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    DbService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
