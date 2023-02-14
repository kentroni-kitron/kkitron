import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';
import { DAY_MS, SECOND_MS } from '@kkitron/shared/utils';

const domain = process.env.KKITRON_OAUTH_API_HOST ?? 'localhost';
const jwtAccessExpiresSc = process.env.JWT_ACCESS_EXPIRES_SECONDS ?? 300;
const jwtRefreshExpiresDs = process.env.JWT_REFRESH_EXPIRES_DAYS ?? 30;

@Injectable()
export class SetAuthGuard extends AuthGuard('local') {
  constructor(private jwtService: JwtService) { super(); }

  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext();

    request.body = gqlContext.getArgs().loginInput;
    return request;
  }

  handleRequest<TUser = User>(
    error: unknown,
    user: User,
    info: unknown,
    context: ExecutionContext,
  ): TUser {
    if (error || !user || info) {
      throw error || new UnauthorizedException();
    }

    const authContext = GqlExecutionContext.create(context);
    const { reply } = authContext.getContext();

    const jwtAccessExpiresMs = Number(jwtAccessExpiresSc) * SECOND_MS;
    const jwtAccessExpiresAt = Date.now() + jwtAccessExpiresMs;
    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const jwtRefreshExpiresMs = Number(jwtRefreshExpiresDs) * DAY_MS;
    const jwtRefreshExpiresSc = jwtRefreshExpiresMs / SECOND_MS;
    const jwtRefreshExpiresAt = Date.now() + jwtRefreshExpiresMs;
    const refreshToken = this.jwtService.sign({ id: user.id });

    reply.setCookie('access-token', accessToken, {
      maxAge: Number(jwtAccessExpiresSc),
      signed: true,
      domain,
    });
    reply.setCookie(
      'access-token-expires',
      jwtAccessExpiresAt.toString(),
      { maxAge: Number(jwtAccessExpiresSc), domain },
    );

    reply.setCookie('refresh-token', refreshToken, {
      maxAge: Number(jwtRefreshExpiresSc),
      signed: true,
      domain,
    });
    reply.setCookie(
      'refresh-token-expires',
      jwtRefreshExpiresAt.toString(),
      { maxAge: Number(jwtRefreshExpiresSc), domain },
    );

    return user as TUser;
  }
}
