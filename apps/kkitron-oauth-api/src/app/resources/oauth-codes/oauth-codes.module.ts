import { Module } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import { OAuthCodesService } from './oauth-codes.service';
import { OAuthCodesResolver } from './oauth-codes.resolver';

@Module({
  providers: [OAuthCodesResolver, OAuthCodesService, DbService],
})
export class OAuthCodesModule {}
