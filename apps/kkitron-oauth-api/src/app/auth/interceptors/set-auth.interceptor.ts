import { Injectable, Type } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SetAuthInterceptor as SetAuthInterceptorNpg } from '@kkitron/shared/npg-utils';
import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';

import { AuthService } from '../auth.service';

export const SetAuthInterceptorFactory = (inputId: string): Type<SetAuthInterceptorNpg<User>> => {
  @Injectable()
  class SetAuthInterceptor extends SetAuthInterceptorNpg<User> {
    protected domain = process.env.KKITRON_OAUTH_API_HOST ?? 'localhost';
    protected accessTokenExpiresMn = Number(process.env.ACCESS_JWT_EXPIRES_MINUTES ?? 5);
    protected refreshTokenExpiresDs = Number(process.env.REFRESH_JWT_EXPIRES_DAYS ?? 30);
    protected inputId = inputId;
  
    constructor(
      protected jwtService: JwtService,
      protected authService: AuthService,
    ) { super(); }
  
    protected userToAccessToken(user: User) {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    }
  
    protected userToRefreshToken(user: User) {
      return { id: user.id };
    }
  }

  return SetAuthInterceptor;
};
