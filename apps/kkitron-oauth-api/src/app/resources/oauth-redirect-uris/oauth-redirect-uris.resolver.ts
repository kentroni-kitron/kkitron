import { UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import {
  OAuthRedirectUri,
  OAuthRedirectUriCreateInput,
  OAuthRedirectUriUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

import { OAuthRedirectUrisService } from './oauth-redirect-uris.service';
import { CheckAuthInterceptor } from '../../auth/interceptors/check-auth.interceptor';

@Resolver(() => OAuthRedirectUri)
export class OAuthRedirectUrisResolver {
  constructor(private readonly oAuthRedirectUriService: OAuthRedirectUrisService) {}

  @Mutation(() => OAuthRedirectUri)
  @UseInterceptors(CheckAuthInterceptor)
  createOAuthRedirectUri(@Args('oAuthRedirectUriCreateInput') oAuthRedirectUriCreateInput: OAuthRedirectUriCreateInput) {
    return this.oAuthRedirectUriService.create(oAuthRedirectUriCreateInput);
  }

  @Query(() => [OAuthRedirectUri], { name: 'oAuthRedirectUris' })
  @UseInterceptors(CheckAuthInterceptor)
  findAll() {
    return this.oAuthRedirectUriService.findAll();
  }

  @Query(() => OAuthRedirectUri, { name: 'oAuthRedirectUri' })
  @UseInterceptors(CheckAuthInterceptor)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthRedirectUriService.findOne(id);
  }

  @Mutation(() => OAuthRedirectUri)
  @UseInterceptors(CheckAuthInterceptor)
  updateOAuthRedirectUri(
    @Args('id', { type: () => Int }) id: number,
    @Args('oAuthRedirectUriUpdateInput') oAuthRedirectUriUpdateInput: OAuthRedirectUriUpdateInput,
  ) {
    return this.oAuthRedirectUriService.update(id, oAuthRedirectUriUpdateInput);
  }

  @Mutation(() => OAuthRedirectUri)
  @UseInterceptors(CheckAuthInterceptor)
  removeOAuthRedirectUri(@Args('id', { type: () => Int } ) id: number) {
    return this.oAuthRedirectUriService.remove(id);
  }
}
