import { Module } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import { OAuthClientsService } from './oauth-clients.service';
import { OAuthClientsResolver } from './oauth-clients.resolver';
import { OAuthScopesService } from '../oauth-scopes/oauth-scopes.service';

@Module({
  providers: [
    OAuthClientsResolver,
    OAuthClientsService,
    OAuthScopesService,
    DbService,
  ],
})
export class OAuthClientsModule {}
