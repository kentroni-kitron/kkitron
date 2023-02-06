import { Injectable } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import {
  OAuthToken,
  OAuthTokenCreateInput,
  OAuthTokenUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

@Injectable()
export class OAuthTokensService {
  constructor(private readonly db: DbService) {}

  create(oAuthTokenCreateInput: OAuthTokenCreateInput) {
    return this.db.oAuthToken.create({ data: oAuthTokenCreateInput });
  }

  findAll() {
    return this.db.oAuthToken.findMany({ where: {} });
  }

  findOne(id: OAuthToken['id']) {
    return this.db.oAuthToken.findUnique({ where: { id } });
  }

  update(id: OAuthToken['id'], oAuthTokenUpdateInput: OAuthTokenUpdateInput) {
    return this.db.oAuthToken.update({ where: { id }, data: oAuthTokenUpdateInput });
  }

  remove(id: OAuthToken['id']) {
    return this.db.oAuthToken.delete({ where: { id } });
  }
}
