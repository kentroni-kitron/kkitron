import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';

import {
  OAuthClient,
  OAuthClientCreateInput,
  OAuthClientUpdateInput,
} from '@kkitron/kkitron-oauth-api/generated/db-types';

import { OAuthClientsService } from './oauth-clients.service';
import { OAuthScopesService } from '../oauth-scopes/oauth-scopes.service';
import { OAuthRedirectUrisService } from '../oauth-redirect-uris/oauth-redirect-uris.service';
import { CheckAuthInterceptor } from '../../auth/interceptors/check-auth.interceptor';

@Resolver(() => OAuthClient)
export class OAuthClientsResolver {
  constructor(
    private readonly oAuthClientsService: OAuthClientsService,
    private readonly oAuthScopesService: OAuthScopesService,
    private readonly oAuthRedirectUrisService: OAuthRedirectUrisService,
  ) {}

  @Mutation(() => OAuthClient)
  @UseInterceptors(CheckAuthInterceptor)
  createOAuthClient(
    @Args('oAuthClientCreateInput')
    oAuthClientCreateInput: OAuthClientCreateInput
  ) {
    return this.oAuthClientsService.create(oAuthClientCreateInput);
  }

  @Query(() => [OAuthClient], { name: 'oAuthClients' })
  @UseInterceptors(CheckAuthInterceptor)
  findAll() {
    return this.oAuthClientsService.findAll();
  }

  @Query(() => OAuthClient, { name: 'oAuthClient' })
  @UseInterceptors(CheckAuthInterceptor)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.oAuthClientsService.findOne(id);
  }

  @Query(() => OAuthClient, { name: 'oAuthClientByName' })
  @UseInterceptors(CheckAuthInterceptor)
  findByName(@Args('name') name: string) {
    return this.oAuthClientsService.findByName(name);
  }

  @ResolveField()
  scopes(@Parent() client: OAuthClient) {
    return this.oAuthScopesService.findByClientId(client.id);
  }

  @ResolveField()
  redirectUris(@Parent() client: OAuthClient) {
    return this.oAuthRedirectUrisService.findByClientId(client.id);
  }

  @Mutation(() => OAuthClient)
  @UseInterceptors(CheckAuthInterceptor)
  updateOAuthClient(
    @Args('id', { type: () => Int }) id: number,
    @Args('oAuthClientUpdateInput') oAuthClientUpdateInput: OAuthClientUpdateInput,
  ) {
    return this.oAuthClientsService.update(id, oAuthClientUpdateInput);
  }

  @Mutation(() => OAuthClient)
  @UseInterceptors(CheckAuthInterceptor)
  removeOAuthClient(@Args('id', { type: () => Int } ) id: number) {
    return this.oAuthClientsService.remove(id);
  }
}
