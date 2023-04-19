import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest, FastifyReply } from 'fastify';
import '@fastify/cookie';

import { isObject } from '@kkitron/shared/utils';

import { JwtServiceOptionsAbstract } from '../../utils';
import { AuthInterceptor } from './auth.interceptor';

@Injectable()
export abstract class UnsetAuthInterceptor extends AuthInterceptor implements NestInterceptor {
  protected abstract domain: string;
  protected jwtOptions: JwtServiceOptionsAbstract = {};

  protected abstract getRequest(context: ExecutionContext): FastifyRequest;
  protected abstract getResponse(context: ExecutionContext): FastifyReply;

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Observable<any>> {
    const request = this.getRequest(context);

    const token = this.extractTokenFromCookies(request, 'refresh-token');
    if (!token) {
      throw new UnauthorizedException();
    }

    const response = this.getResponse(context);

    const result = this.jwtService.verify(token, this.jwtOptions);
    if (!isObject<{ id: string }>(result, { id: String })) {
      this.unsetRefreshToken(response, this.domain);
      throw new UnauthorizedException();
    }

    this.unsetRefreshToken(response, this.domain);

    return next.handle();
  }
}
