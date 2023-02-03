import { Module } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth/data-access-db';

import { OAuthClientsService } from './oauth-clients.service';
import { OAuthClientsResolver } from './oauth-clients.resolver';

@Module({
  providers: [OAuthClientsResolver, OAuthClientsService, DbService],
})
export class OAuthClientsModule {}
