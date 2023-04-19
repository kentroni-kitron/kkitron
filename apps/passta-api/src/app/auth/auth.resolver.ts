import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, UseInterceptors } from '@nestjs/common';

import { User } from '@kkitron/passta-api/generated/db-types';

import { UnsetAuthGuard } from './guards/unset-auth.guard';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input.dto';
import { UserContext } from './types';
import { SetAuthInterceptor } from './interceptors/set-auth.interceptor';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  @UseInterceptors(SetAuthInterceptor)
  login(
    @Args('loginInput') _loginInput: LoginInput,
    @Context() context: UserContext,
  ) {
    return context.user;
  }

  @Mutation(() => User)
  signUp(@Args('signUpInput') signUpInput: LoginInput) {
    return this.authService.signUp(signUpInput);
  }

  @UseGuards(UnsetAuthGuard)
  @Mutation(() => String)
  logout() {
    return 'bye-bye';
  }
}
