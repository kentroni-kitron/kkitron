import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import { UsersService } from '../users/users.service';
import { OAuthTokensService } from './oauth-tokens.service';
import { OAuthTokensResolver } from './oauth-tokens.resolver';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.KKITRON_OAUTH_JWT_SECRET }),
  ],
  providers: [
    DbService,
    UsersService,
    OAuthTokensResolver,
    OAuthTokensService,
  ],
})
export class OAuthTokensModule {}
