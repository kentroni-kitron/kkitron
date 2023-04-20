import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';

@ObjectType()
export class LogInOutput {
  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => String, { nullable: true })
  token: string;

  @Field(() => String, { nullable: true })
  tokenExpires: Date;
}
