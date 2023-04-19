import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersService } from '../resources/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.KKITRON_OAUTH_JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.ACCESS_JWT_EXPIRES_MINUTES) * 60 },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    DbService,
    UsersService,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
