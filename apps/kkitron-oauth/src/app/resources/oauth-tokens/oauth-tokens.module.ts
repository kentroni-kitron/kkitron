import { Module } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth/data-access-db';

import { OAuthTokensService } from './oauth-tokens.service';
import { OAuthTokensResolver } from './oauth-tokens.resolver';

@Module({
  providers: [OAuthTokensResolver, OAuthTokensService, DbService],
})
export class OAuthTokensModule {}
