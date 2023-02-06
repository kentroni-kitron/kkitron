import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import {
  OAuthCode,
  OAuthCodeCreateInput,
  OAuthCodeUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

import { OAuthCodesService } from './oauth-codes.service';

@Resolver(() => OAuthCode)
export class OAuthCodesResolver {
  constructor(private readonly oAuthCodeService: OAuthCodesService) {}

  @Mutation(() => OAuthCode)
  createOAuthCode(@Args('oAuthCodeCreateInput') oAuthCodeCreateInput: OAuthCodeCreateInput) {
    return this.oAuthCodeService.create(oAuthCodeCreateInput);
  }

  @Query(() => [OAuthCode], { name: 'oAuthCodes' })
  findAll() {
    return this.oAuthCodeService.findAll();
  }

  @Query(() => OAuthCode, { name: 'oAuthCode' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthCodeService.findOne(id);
  }

  @Mutation(() => OAuthCode)
  updateOAuthCode(
    @Args('id', { type: () => Int }) id: number,
    @Args('oAuthCodeUpdateInput') oAuthCodeUpdateInput: OAuthCodeUpdateInput,
  ) {
    return this.oAuthCodeService.update(id, oAuthCodeUpdateInput);
  }

  @Mutation(() => OAuthCode)
  removeOAuthCode(@Args('id', { type: () => Int } ) id: number) {
    return this.oAuthCodeService.remove(id);
  }
}
