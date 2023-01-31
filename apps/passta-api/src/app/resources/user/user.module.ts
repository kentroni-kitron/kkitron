import { Module } from '@nestjs/common';

import { DbService } from '@kkitron/passta-api/data-access-db';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserResolver, UserService, DbService],
})
export class UserModule {}
