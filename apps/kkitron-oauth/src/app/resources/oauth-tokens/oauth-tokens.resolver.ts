import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import {
  OAuthToken,
  OAuthTokenCreateInput,
  OAuthTokenUpdateInput,
} from '@kkitron/kkitron-oauth/generated/db-types';

import { OAuthTokensService } from './oauth-tokens.service';

@Resolver(() => OAuthToken)
export class OAuthTokensResolver {
  constructor(private readonly oAuthTokenService: OAuthTokensService) {}

  @Mutation(() => OAuthToken)
  createOAuthToken(@Args('oAuthTokenCreateInput') oAuthTokenCreateInput: OAuthTokenCreateInput) {
    return this.oAuthTokenService.create(oAuthTokenCreateInput);
  }

  @Query(() => [OAuthToken], { name: 'oAuthTokens' })
  findAll() {
    return this.oAuthTokenService.findAll();
  }

  @Query(() => OAuthToken, { name: 'oAuthToken' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthTokenService.findOne(id);
  }

  @Mutation(() => OAuthToken)
  updateOAuthToken(
    @Args('id', { type: () => Int }) id: number,
    @Args('oAuthTokenUpdateInput') oAuthTokenUpdateInput: OAuthTokenUpdateInput,
  ) {
    return this.oAuthTokenService.update(id, oAuthTokenUpdateInput);
  }

  @Mutation(() => OAuthToken)
  removeOAuthToken(@Args('id', { type: () => Int } ) id: number) {
    return this.oAuthTokenService.remove(id);
  }
}
