import { Module } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth/data-access-db';

import { OAuthRedirectUrisService } from './oauth-redirect-uris.service';
import { OAuthRedirectUrisResolver } from './oauth-redirect-uris.resolver';

@Module({
  providers: [OAuthRedirectUrisResolver, OAuthRedirectUrisService, DbService],
})
export class OAuthRedirectUrisModule {}
