import { Injectable } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import {
  OAuthRedirectUri,
  OAuthRedirectUriCreateInput,
  OAuthRedirectUriUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

@Injectable()
export class OAuthRedirectUrisService {
  constructor(private readonly db: DbService) {}

  create(oAuthRedirectUriCreateInput: OAuthRedirectUriCreateInput) {
    return this.db.oAuthRedirectUri.create({ data: oAuthRedirectUriCreateInput });
  }

  findAll() {
    return this.db.oAuthRedirectUri.findMany({ where: {} });
  }

  findOne(id: OAuthRedirectUri['id']) {
    return this.db.oAuthRedirectUri.findUnique({ where: { id } });
  }

  findByClientId(clientId: OAuthRedirectUri['client']['id']) {
    return this.db.oAuthRedirectUri.findMany({ where: { clientId } });
  }

  update(id: OAuthRedirectUri['id'], oAuthRedirectUriUpdateInput: OAuthRedirectUriUpdateInput) {
    return this.db.oAuthRedirectUri.update({ where: { id }, data: oAuthRedirectUriUpdateInput });
  }

  remove(id: OAuthRedirectUri['id']) {
    return this.db.oAuthRedirectUri.delete({ where: { id } });
  }
}
