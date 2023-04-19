import { UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import {
  OAuthScope,
  OAuthScopeCreateInput,
  OAuthScopeUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

import { OAuthScopesService } from './oauth-scopes.service';
import { CheckAuthInterceptor } from '../../auth/interceptors/check-auth.interceptor';

@Resolver(() => OAuthScope)
export class OAuthScopesResolver {
  constructor(private readonly oAuthScopeService: OAuthScopesService) {}

  @Mutation(() => OAuthScope)
  @UseInterceptors(CheckAuthInterceptor)
  createOAuthScope(@Args('oAuthScopeCreateInput') oAuthScopeCreateInput: OAuthScopeCreateInput) {
    return this.oAuthScopeService.create(oAuthScopeCreateInput);
  }

  @Query(() => [OAuthScope], { name: 'oAuthScopes' })
  @UseInterceptors(CheckAuthInterceptor)
  findAll() {
    return this.oAuthScopeService.findAll();
  }

  @Query(() => OAuthScope, { name: 'oAuthScope' })
  @UseInterceptors(CheckAuthInterceptor)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthScopeService.findOne(id);
  }

  @Mutation(() => OAuthScope)
  @UseInterceptors(CheckAuthInterceptor)
  updateOAuthScope(
    @Args('id', { type: () => Int }) id: number,
    @Args('oAuthScopeUpdateInput') oAuthScopeUpdateInput: OAuthScopeUpdateInput,
  ) {
    return this.oAuthScopeService.update(id, oAuthScopeUpdateInput);
  }

  @Mutation(() => OAuthScope)
  @UseInterceptors(CheckAuthInterceptor)
  removeOAuthScope(@Args('id', { type: () => Int } ) id: number) {
    return this.oAuthScopeService.remove(id);
  }
}
