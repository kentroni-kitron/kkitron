import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import {
  OAuthClient,
  OAuthClientCreateInput,
  OAuthClientUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

import { OAuthClientsService } from './oauth-clients.service';
import { OAuthScopesService } from '../oauth-scopes/oauth-scopes.service';
import { CheckAuthGuard } from '../../guards/check-auth.guard';

@Resolver(() => OAuthClient)
export class OAuthClientsResolver {
  constructor(
    private readonly oAuthClientService: OAuthClientsService,
    private readonly oAuthScopeService: OAuthScopesService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @Mutation(() => OAuthClient)
  createOAuthClient(
    @Args('oAuthClientCreateInput')
    oAuthClientCreateInput: OAuthClientCreateInput
  ) {
    return this.oAuthClientService.create(oAuthClientCreateInput);
  }

  @UseGuards(CheckAuthGuard)
  @Query(() => [OAuthClient], { name: 'oAuthClients' })
  findAll() {
    return this.oAuthClientService.findAll();
  }

  @Query(() => OAuthClient, { name: 'oAuthClient' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthClientService.findOne(id);
  }

  @Query(() => OAuthClient, { name: 'oAuthClientByName' })
  findByName(@Args('name') name: string) {
    return this.oAuthClientService.findByName(name);
  }

  @ResolveField()
  scopes(@Parent() client: OAuthClient) {
    return this.oAuthScopeService.findByClientId(client.id);
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
