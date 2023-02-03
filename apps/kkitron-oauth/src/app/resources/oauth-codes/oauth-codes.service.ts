import { Injectable } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth/data-access-db';

import {
  OAuthCode,
  OAuthCodeCreateInput,
  OAuthCodeUpdateInput,
} from '@kkitron/kkitron-oauth/generated/db-types';

@Injectable()
export class OAuthCodesService {
  constructor(private readonly db: DbService) {}

  create(oAuthCodeCreateInput: OAuthCodeCreateInput) {
    return this.db.oAuthCode.create({ data: oAuthCodeCreateInput });
  }

  findAll() {
    return this.db.oAuthCode.findMany({ where: {} });
  }

  findOne(id: OAuthCode['id']) {
    return this.db.oAuthCode.findUnique({ where: { id } });
  }

  update(id: OAuthCode['id'], oAuthCodeUpdateInput: OAuthCodeUpdateInput) {
    return this.db.oAuthCode.update({ where: { id }, data: oAuthCodeUpdateInput });
  }

  remove(id: OAuthCode['id']) {
    return this.db.oAuthCode.delete({ where: { id } });
  }
}
