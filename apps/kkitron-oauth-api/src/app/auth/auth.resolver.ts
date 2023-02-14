import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';

import { SetAuthGuard } from '../guards/set-auth.guard';
import { UnsetAuthGuard } from '../guards/unset-auth.guard';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input.dto';
import { UserContext } from './types';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(SetAuthGuard)
  @Mutation(() => User)
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
