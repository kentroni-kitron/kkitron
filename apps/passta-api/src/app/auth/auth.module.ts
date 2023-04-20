import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DbService } from '@kkitron/passta-api/data-access-db';

import { AuthResolver } from './auth.resolver';
import { UsersService } from '../resources/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.KKITRON_OAUTH_JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.JWT_ACCESS_EXPIRES_SECONDS) },
    }),
  ],
  providers: [
    AuthResolver,
    DbService,
    UsersService,
  ],
})
export class AuthModule {}
