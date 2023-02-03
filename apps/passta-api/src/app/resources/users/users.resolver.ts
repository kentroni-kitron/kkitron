import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import {
  User,
  UserCreateInput,
  UserUpdateInput,
} from '@kkitron/passta-api/generated/db-types';

import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('userCreateInput') userCreateInput: UserCreateInput) {
    return this.userService.create(userCreateInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id') id: string,
    @Args('userUpdateInput') userUpdateInput: UserUpdateInput,
  ) {
    return this.userService.update(id, userUpdateInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
