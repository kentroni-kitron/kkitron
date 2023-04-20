import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CheckAuthInterceptor as CheckAuthInterceptorNpg } from '@kkitron/shared/npg-utils';
import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';

import { UsersService } from '../../resources/users/users.service';
import { isObject } from '@kkitron/shared/utils';

@Injectable()
export class CheckAuthInterceptor extends CheckAuthInterceptorNpg<User> {
  protected domain = process.env.KKITRON_OAUTH_API_HOST ?? 'localhost';
  protected accessTokenExpiresMn = Number(process.env.ACCESS_JWT_EXPIRES_MINUTES ?? 5);
  protected refreshTokenExpiresDs = Number(process.env.REFRESH_JWT_EXPIRES_DAYS ?? 30);

  constructor(
    protected jwtService: JwtService,
    protected usersService: UsersService,
  ) { super(); }

  protected getUser(jwtPayload: unknown): Promise<User | null> {
    if (!isObject<{ login: string }>(jwtPayload, { login: String })) {
      return null;
    }

    return this.usersService.findByLogin(jwtPayload.login);
  }
}
