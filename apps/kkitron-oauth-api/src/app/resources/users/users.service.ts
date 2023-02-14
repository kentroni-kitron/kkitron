import { Injectable } from '@nestjs/common';

import { DbService } from '@kkitron/kkitron-oauth-api/data-access-db';
import {
  User,
  UserCreateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  create(userCreateInput: UserCreateInput) {
    return this.db.user.create({ data: userCreateInput });
  }

  findByEmail(email: User['email']) {
    return this.db.user.findUnique({ where: { email } });
  }

  remove(id: User['id']) {
    return this.db.user.delete({ where: { id } });
  }
}
