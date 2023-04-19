import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import { UsersService } from '../users/users.service';
import { OAuthClientsService } from '../oauth-clients/oauth-clients.service';
import { OAuthScopesService } from './oauth-scopes.service';
import { OAuthScopesResolver } from './oauth-scopes.resolver';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.KKITRON_OAUTH_JWT_SECRET }),
  ],
  providers: [
    DbService,
    UsersService,
    OAuthClientsService,
    OAuthScopesResolver,
    OAuthScopesService,
  ],
})
export class OAuthScopesModule {}
