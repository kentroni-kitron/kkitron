import { Module } from '@nestjs/common';

import { DbService } from '@kkitron/passta-api/data-access-db';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, UsersService, DbService],
})
export class UsersModule {}
