import { UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import {
  OAuthCode,
  OAuthCodeCreateInput,
  OAuthCodeUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

import { OAuthCodesService } from './oauth-codes.service';
import { CheckAuthInterceptor } from '../../auth/interceptors/check-auth.interceptor';

@Resolver(() => OAuthCode)
export class OAuthCodesResolver {
  constructor(private readonly oAuthCodeService: OAuthCodesService) {}

  @Mutation(() => OAuthCode)
  @UseInterceptors(CheckAuthInterceptor)
  createOAuthCode(@Args('oAuthCodeCreateInput') oAuthCodeCreateInput: OAuthCodeCreateInput) {
    return this.oAuthCodeService.create(oAuthCodeCreateInput);
  }

  @Query(() => [OAuthCode], { name: 'oAuthCodes' })
  @UseInterceptors(CheckAuthInterceptor)
  findAll() {
    return this.oAuthCodeService.findAll();
  }

  @Query(() => OAuthCode, { name: 'oAuthCode' })
  @UseInterceptors(CheckAuthInterceptor)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthCodeService.findOne(id);
  }

  @Mutation(() => OAuthCode)
  @UseInterceptors(CheckAuthInterceptor)
  updateOAuthCode(
    @Args('id', { type: () => Int }) id: number,
    @Args('oAuthCodeUpdateInput') oAuthCodeUpdateInput: OAuthCodeUpdateInput,
  ) {
    return this.oAuthCodeService.update(id, oAuthCodeUpdateInput);
  }

  @Mutation(() => OAuthCode)
  @UseInterceptors(CheckAuthInterceptor)
  removeOAuthCode(@Args('id', { type: () => Int } ) id: number) {
    return this.oAuthCodeService.remove(id);
  }
}
