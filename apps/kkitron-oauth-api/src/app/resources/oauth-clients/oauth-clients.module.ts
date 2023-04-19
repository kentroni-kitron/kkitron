import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import { UsersService } from '../users/users.service';
import { OAuthClientsService } from './oauth-clients.service';
import { OAuthClientsResolver } from './oauth-clients.resolver';
import { OAuthScopesService } from '../oauth-scopes/oauth-scopes.service';
import { OAuthRedirectUrisService } from '../oauth-redirect-uris/oauth-redirect-uris.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.KKITRON_OAUTH_JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.ACCESS_JWT_EXPIRES_MINUTES) * 60 },
    }),
  ],
  providers: [
    DbService,
    UsersService,
    OAuthScopesService,
    OAuthRedirectUrisService,
    OAuthClientsResolver,
    OAuthClientsService,
  ],
})
export class OAuthClientsModule {}
