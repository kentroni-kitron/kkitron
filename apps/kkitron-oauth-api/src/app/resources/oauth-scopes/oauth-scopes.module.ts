import { Module } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import { OAuthScopesService } from './oauth-scopes.service';
import { OAuthScopesResolver } from './oauth-scopes.resolver';
import { OAuthClientsService } from '../oauth-clients/oauth-clients.service';

@Module({
  providers: [
    OAuthScopesResolver,
    OAuthScopesService,
    OAuthClientsService,
    DbService,
  ],
})
export class OAuthScopesModule {}
