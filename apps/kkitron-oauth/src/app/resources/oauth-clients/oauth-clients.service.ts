import { Injectable } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth/data-access-db';

import {
  OAuthClient,
  OAuthClientCreateInput,
  OAuthClientUpdateInput,
} from '@kkitron/kkitron-oauth/generated/db-types';

@Injectable()
export class OAuthClientsService {
  constructor(private readonly db: DbService) {}

  create(oAuthClientCreateInput: OAuthClientCreateInput) {
    return this.db.oAuthClient.create({ data: oAuthClientCreateInput });
  }

  findAll() {
    return this.db.oAuthClient.findMany({ where: {} });
  }

  findOne(id: OAuthClient['id']) {
    return this.db.oAuthClient.findUnique({ where: { id } });
  }

  update(id: OAuthClient['id'], oAuthClientUpdateInput: OAuthClientUpdateInput) {
    return this.db.oAuthClient.update({ where: { id }, data: oAuthClientUpdateInput });
  }

  remove(id: OAuthClient['id']) {
    return this.db.oAuthClient.delete({ where: { id } });
  }
}
