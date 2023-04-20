import { InputType, PickType } from '@nestjs/graphql';

import { UserCreateInput } from '@kkitron/kkitron-oauth-api/generated/db-types';

@InputType()
export class LogInInput extends PickType(UserCreateInput, ['email', 'password']) {}
