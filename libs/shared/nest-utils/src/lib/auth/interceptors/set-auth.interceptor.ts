import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest, FastifyReply } from 'fastify';

// Cookie support has to be set on the fastify application
import '@fastify/cookie';

import { AuthInterceptor } from './auth.interceptor';
import { JwtServiceOptionsAbstract } from '../../utils';

@Injectable()
export abstract class SetAuthInterceptor<U> extends AuthInterceptor implements NestInterceptor {
  protected abstract domain: string;
  protected abstract accessTokenExpiresMn: number;
  protected abstract refreshTokenExpiresDs: number;
  protected jwtOptions: JwtServiceOptionsAbstract = {};

  protected abstract getRequest(context: ExecutionContext): FastifyRequest;
  protected abstract getResponse(context: ExecutionContext): FastifyReply;
  protected abstract validateUser(requestBody: unknown): Promise<U | null>;
  protected abstract userToAccessToken(user: U): { [key: string]: string | number };
  protected abstract userToRefreshToken(user: U): { [key: string]: string | number };

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Observable<any>> {
    const request = this.getRequest(context);
    const user = await this.validateUser(request.body);
    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = user as U;

    const response = this.getResponse(context);

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
