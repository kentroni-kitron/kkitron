import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import {
  OAuthRedirectUri,
  OAuthRedirectUriCreateInput,
  OAuthRedirectUriUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

import { OAuthRedirectUrisService } from './oauth-redirect-uris.service';

@Resolver(() => OAuthRedirectUri)
export class OAuthRedirectUrisResolver {
  constructor(private readonly oAuthRedirectUriService: OAuthRedirectUrisService) {}

  @Mutation(() => OAuthRedirectUri)
  createOAuthRedirectUri(@Args('oAuthRedirectUriCreateInput') oAuthRedirectUriCreateInput: OAuthRedirectUriCreateInput) {
    return this.oAuthRedirectUriService.create(oAuthRedirectUriCreateInput);
  }

  @Query(() => [OAuthRedirectUri], { name: 'oAuthRedirectUris' })
  findAll() {
    return this.oAuthRedirectUriService.findAll();
  }

  @Query(() => OAuthRedirectUri, { name: 'oAuthRedirectUri' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthRedirectUriService.findOne(id);
  }

  @Mutation(() => OAuthRedirectUri)
  updateOAuthRedirectUri(
    @Args('id', { type: () => Int }) id: number,
    @Args('oAuthRedirectUriUpdateInput') oAuthRedirectUriUpdateInput: OAuthRedirectUriUpdateInput,
  ) {
    return this.oAuthRedirectUriService.update(id, oAuthRedirectUriUpdateInput);
  }

  @Mutation(() => OAuthRedirectUri)
  removeOAuthRedirectUri(@Args('id', { type: () => Int } ) id: number) {
    return this.oAuthRedirectUriService.remove(id);
  }
}
