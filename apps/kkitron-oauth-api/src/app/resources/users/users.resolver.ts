import { Resolver, Mutation, Args } from '@nestjs/graphql';

import {
  User,
  UserCreateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('userCreateInput') userCreateInput: UserCreateInput) {
    return this.usersService.create(userCreateInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
