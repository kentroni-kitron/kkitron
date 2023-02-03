import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import {
  OAuthClient,
  OAuthClientCreateInput,
  OAuthClientUpdateInput,
} from '@kkitron/kkitron-oauth/generated/db-types';

import { OAuthClientsService } from './oauth-clients.service';

@Resolver(() => OAuthClient)
export class OAuthClientsResolver {
  constructor(private readonly oAuthClientService: OAuthClientsService) {}

  @Mutation(() => OAuthClient)
  createOAuthClient(
    @Args('oAuthClientCreateInput')
    oAuthClientCreateInput: OAuthClientCreateInput
  ) {
    return this.oAuthClientService.create(oAuthClientCreateInput);
  }

  @Query(() => [OAuthClient], { name: 'oAuthClients' })
  findAll() {
    return this.oAuthClientService.findAll();
  }

  @Query(() => OAuthClient, { name: 'oAuthClient' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthClientService.findOne(id);
  }

  @Mutation(() => OAuthClient)
  updateOAuthClient(
    @Args('id', { type: () => Int }) id: number,
    @Args('oAuthClientUpdateInput') oAuthClientUpdateInput: OAuthClientUpdateInput,
  ) {
    return this.oAuthClientService.update(id, oAuthClientUpdateInput);
  }

  @Mutation(() => OAuthClient)
  removeOAuthClient(@Args('id', { type: () => Int } ) id: number) {
    return this.oAuthClientService.remove(id);
  }
}
