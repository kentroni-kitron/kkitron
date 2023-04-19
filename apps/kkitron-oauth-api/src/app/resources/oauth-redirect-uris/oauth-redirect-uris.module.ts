import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import { UsersService } from '../users/users.service';
import { OAuthRedirectUrisService } from './oauth-redirect-uris.service';
import { OAuthRedirectUrisResolver } from './oauth-redirect-uris.resolver';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.KKITRON_OAUTH_JWT_SECRET }),
  ],
  providers: [
    DbService,
    UsersService,
    OAuthRedirectUrisResolver,
    OAuthRedirectUrisService,
  ],
})
export class OAuthRedirectUrisModule {}
