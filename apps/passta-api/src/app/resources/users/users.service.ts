import { Injectable } from '@nestjs/common';

import { DbService } from '@kkitron/passta-api/data-access-db';
import {
  User,
  UserCreateInput,
  UserUpdateInput,
} from '@kkitron/passta-api/generated/db-types';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  create(userCreateInput: UserCreateInput) {
    return this.db.user.create({ data: userCreateInput });
  }

  findAll() {
    return this.db.user.findMany({ where: {} });
  }

  findOne(id: User['id']) {
    return this.db.user.findUnique({ where: { id } });
  }

  update(id: User['id'], userUpdateInput: UserUpdateInput) {
    return this.db.user.update({ where: { id }, data: userUpdateInput });
  }

  remove(id: User['id']) {
    return this.db.user.delete({ where: { id } });
  }
}
