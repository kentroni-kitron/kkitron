import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

export enum OAuthService {
  kkitron = 'kkitron',
};

@InputType()
export class OAuthLoginInput {
  @Field(() => OAuthService, { nullable: false })
  @Validator.IsEnum(OAuthService)
  service!: keyof typeof OAuthService;
}
