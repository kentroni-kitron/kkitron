import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';

import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';

import { AuthService } from './auth.service';
import { UserContext } from './types';
import { SetAuthInterceptorFactory } from './interceptors/set-auth.interceptor';
import { RefreshAuthInterceptor } from './interceptors/refresh-auth.interceptor';
import { UnsetAuthInterceptor } from './interceptors/unset-auth.interceptor';
import { LoginInput } from './dto/login-input.dto';
import { LoginOutput } from './dto/login-output.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginOutput)
  @UseInterceptors(SetAuthInterceptorFactory('loginInput'))
  login(
    @Args('loginInput') _loginInput: LoginInput,
    @Context() context: UserContext,
  ) {
    const request = context.req;
    const { user, token, tokenExpires } = request;
    return { user, token, tokenExpires };
  }

  @Mutation(() => User)
  signUp(@Args('signUpInput') signUpInput: LoginInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => LoginOutput)
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
  logout() {
    return 'bye-bye';
  }
}
