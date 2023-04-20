import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest, FastifyReply } from 'fastify';

import { Serializable } from '@kkitron/shared/utils';

import { AuthInterceptor } from './auth.interceptor';
import { JwtServiceOptionsAbstract } from '../../utils';

@Injectable()
export abstract class RefreshAuthInterceptor<U> extends AuthInterceptor implements NestInterceptor {
  protected abstract domain: string;
  protected abstract accessTokenExpiresMn: number;
  protected abstract refreshTokenExpiresDs: number;
  protected jwtOptions: JwtServiceOptionsAbstract = {};

  protected abstract getRequest(context: ExecutionContext): FastifyRequest;
  protected abstract getResponse(context: ExecutionContext): FastifyReply;
  protected abstract getUser(jwtPayload: unknown): Promise<U | null>;
  protected abstract userToAccessToken(user: U): Serializable;
  protected abstract userToRefreshToken(user: U): Serializable;

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Observable<any>> {
    const request = this.getRequest(context);
    const response = this.getResponse(context);
    const token = this.extractTokenFromCookies(request, 'refresh-token');
    if (!token) {
      throw new UnauthorizedException();
    }

    let user: U;
    try {
      const result = this.jwtService.verify(token, this.jwtOptions);
      user = await this.getUser(result);
      if (!user) {
        this.unsetRefreshToken(response, this.domain);
        throw new UnauthorizedException();
      }
    } catch (_e) {
      this.unsetRefreshToken(response, this.domain);
      throw new UnauthorizedException();
    }

    request.user = user;

    this.setAccessToken(
      request,
      this.accessTokenExpiresMn,
      this.jwtOptions,
      this.userToAccessToken(user),
    );
    this.setRefreshToken(
      response,
      this.refreshTokenExpiresDs,
      this.jwtOptions,
      this.userToRefreshToken(user),
      this.domain,
    );

    return next.handle();
  }
}
