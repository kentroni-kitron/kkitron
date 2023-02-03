import { Module } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth/data-access-db';

import { OAuthScopesService } from './oauth-scopes.service';
import { OAuthScopesResolver } from './oauth-scopes.resolver';

@Module({
  providers: [OAuthScopesResolver, OAuthScopesService, DbService],
})
export class OAuthScopesModule {}
