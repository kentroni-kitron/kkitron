import { UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import {
  OAuthToken,
  OAuthTokenCreateInput,
  OAuthTokenUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

import { OAuthTokensService } from './oauth-tokens.service';
import { CheckAuthInterceptor } from '../../auth/interceptors/check-auth.interceptor';

@Resolver(() => OAuthToken)
export class OAuthTokensResolver {
  constructor(private readonly oAuthTokenService: OAuthTokensService) {}

  @Mutation(() => OAuthToken)
  @UseInterceptors(CheckAuthInterceptor)
  createOAuthToken(@Args('oAuthTokenCreateInput') oAuthTokenCreateInput: OAuthTokenCreateInput) {
    return this.oAuthTokenService.create(oAuthTokenCreateInput);
  }

  @Query(() => [OAuthToken], { name: 'oAuthTokens' })
  @UseInterceptors(CheckAuthInterceptor)
  findAll() {
    return this.oAuthTokenService.findAll();
  }

  @Query(() => OAuthToken, { name: 'oAuthToken' })
  @UseInterceptors(CheckAuthInterceptor)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthTokenService.findOne(id);
  }

  @Mutation(() => OAuthToken)
  @UseInterceptors(CheckAuthInterceptor)
  updateOAuthToken(
    @Args('id', { type: () => Int }) id: number,
    @Args('oAuthTokenUpdateInput') oAuthTokenUpdateInput: OAuthTokenUpdateInput,
  ) {
    return this.oAuthTokenService.update(id, oAuthTokenUpdateInput);
  }

  @Mutation(() => OAuthToken)
  @UseInterceptors(CheckAuthInterceptor)
  removeOAuthToken(@Args('id', { type: () => Int } ) id: number) {
    return this.oAuthTokenService.remove(id);
  }
}
