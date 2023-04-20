import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';

import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';

import { AuthService } from './auth.service';
import { UserContext } from './types';
import { SetAuthInterceptorFactory } from './interceptors/set-auth.interceptor';
import { RefreshAuthInterceptor } from './interceptors/refresh-auth.interceptor';
import { UnsetAuthInterceptor } from './interceptors/unset-auth.interceptor';
import { LogInInput } from './dto/log-in-input.dto';
import { LogInOutput } from './dto/log-in-output.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LogInOutput)
  @UseInterceptors(SetAuthInterceptorFactory('logInInput'))
  logIn(
    @Args('logInInput') _logInInput: LogInInput,
    @Context() context: UserContext,
  ) {
    const request = context.req;
    const { user, token, tokenExpires } = request;
    return { user, token, tokenExpires };
  }

  @Mutation(() => User)
  signUp(@Args('signUpInput') signUpInput: LogInInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => LogInOutput)
  @UseInterceptors(RefreshAuthInterceptor)
  refresh(
    @Context() context: UserContext,
  ) {
    const request = context.req;
    const { user, token, tokenExpires } = request;
    return { user, token, tokenExpires };
  }

  @Mutation(() => String)
  @UseInterceptors(UnsetAuthInterceptor)
  logOut() {
    return 'bye-bye';
  }
}
