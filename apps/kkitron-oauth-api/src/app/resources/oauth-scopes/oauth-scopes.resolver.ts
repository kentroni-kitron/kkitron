import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import {
  OAuthScope,
  OAuthScopeCreateInput,
  OAuthScopeUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

import { OAuthScopesService } from './oauth-scopes.service';

@Resolver(() => OAuthScope)
export class OAuthScopesResolver {
  constructor(private readonly oAuthScopeService: OAuthScopesService) {}

  @Mutation(() => OAuthScope)
  createOAuthScope(@Args('oAuthScopeCreateInput') oAuthScopeCreateInput: OAuthScopeCreateInput) {
    return this.oAuthScopeService.create(oAuthScopeCreateInput);
  }

  @Query(() => [OAuthScope], { name: 'oAuthScopes' })
  findAll() {
    return this.oAuthScopeService.findAll();
  }

  @Query(() => OAuthScope, { name: 'oAuthScope' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthScopeService.findOne(id);
  }

  @Mutation(() => OAuthScope)
  updateOAuthScope(
    @Args('id', { type: () => Int }) id: number,
    @Args('oAuthScopeUpdateInput') oAuthScopeUpdateInput: OAuthScopeUpdateInput,
  ) {
    return this.oAuthScopeService.update(id, oAuthScopeUpdateInput);
  }

  @Mutation(() => OAuthScope)
  removeOAuthScope(@Args('id', { type: () => Int } ) id: number) {
    return this.oAuthScopeService.remove(id);
  }
}
