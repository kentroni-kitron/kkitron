import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import { UsersService } from '../users/users.service';
import { OAuthCodesService } from './oauth-codes.service';
import { OAuthCodesResolver } from './oauth-codes.resolver';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.KKITRON_OAUTH_JWT_SECRET }),
  ],
  providers: [
    DbService,
    UsersService,
    OAuthCodesResolver,
    OAuthCodesService,
  ],
})
export class OAuthCodesModule {}
