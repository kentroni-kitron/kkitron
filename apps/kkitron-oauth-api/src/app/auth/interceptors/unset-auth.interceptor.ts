import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UnsetAuthInterceptor as UnsetAuthInterceptorNpg } from '@kkitron/shared/npg-utils';

@Injectable()
export class UnsetAuthInterceptor extends UnsetAuthInterceptorNpg {
  protected domain = process.env.KKITRON_OAUTH_API_HOST ?? 'localhost';
  protected accessTokenExpiresMn = Number(process.env.ACCESS_JWT_EXPIRES_MINUTES ?? 5);
  protected refreshTokenExpiresDs = Number(process.env.REFRESH_JWT_EXPIRES_DAYS ?? 30);

  constructor(protected jwtService: JwtService) { super(); }
}
