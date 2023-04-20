import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RefreshAuthInterceptor as RefreshAuthInterceptorNpg } from '@kkitron/shared/npg-utils';
import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';
import { isObject } from '@kkitron/shared/utils';

import { UsersService } from '../../resources/users/users.service';

@Injectable()
export class RefreshAuthInterceptor extends RefreshAuthInterceptorNpg<User> {
  protected domain = process.env.KKITRON_OAUTH_API_HOST ?? 'localhost';
  protected accessTokenExpiresMn = Number(process.env.ACCESS_JWT_EXPIRES_MINUTES ?? 5);
  protected refreshTokenExpiresDs = Number(process.env.REFRESH_JWT_EXPIRES_DAYS ?? 30);

  constructor(
    protected jwtService: JwtService,
    protected usersService: UsersService,
  ) { super(); }

  protected getUser(jwtPayload: unknown): Promise<User | null> {
    if (!isObject<{ id: string }>(jwtPayload, { id: String })) {
      return null;
    }

    return this.usersService.findById(jwtPayload.id);
  }

  protected userToAccessToken(user: User) {
    return {
      id: user.id,
      login: user.login,
      role: user.role,
    };
  }

  protected userToRefreshToken(user: User) {
    return { id: user.id };
  }
}
