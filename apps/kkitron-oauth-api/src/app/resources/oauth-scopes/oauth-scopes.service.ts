import { Injectable } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';

import {
  OAuthScope,
  OAuthScopeCreateInput,
  OAuthScopeUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

@Injectable()
export class OAuthScopesService {
  constructor(private readonly db: DbService) {}

  create(oAuthScopeCreateInput: OAuthScopeCreateInput) {
    return this.db.oAuthScope.create({ data: oAuthScopeCreateInput });
  }

  findAll() {
    return this.db.oAuthScope.findMany({ where: {} });
  }

  findByClientId(clientId: OAuthScope['clientId']) {
    return this.db.oAuthScope.findMany({ where: { clientId } });
  }

  findOne(id: OAuthScope['id']) {
    return this.db.oAuthScope.findUnique({ where: { id } });
  }


  update(id: OAuthScope['id'], oAuthScopeUpdateInput: OAuthScopeUpdateInput) {
    return this.db.oAuthScope.update({ where: { id }, data: oAuthScopeUpdateInput });
  }

  remove(id: OAuthScope['id']) {
    return this.db.oAuthScope.delete({ where: { id } });
  }
}
