import { Resolver, Mutation } from '@nestjs/graphql';

import { User } from '@kkitron/passta-api/generated/db-types';

@Resolver(() => User)
export class AuthResolver {
  @Mutation(() => String)
  logout() {
    return 'bye-bye';
  }
}
