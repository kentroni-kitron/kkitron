import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest, FastifyReply } from 'fastify';

import { AuthInterceptor } from './auth.interceptor';
import { JwtServiceOptionsAbstract } from '../../utils';

export type CheckAuthInterceptorOptions = {
  tokenId: string,
  /**
   * string concatenated with tokenId to get the cookie
   * containing expiry date. By default = 'expires'
   */
  expiresId?: string,
  httpOnly?: boolean,
  jwtOptions: JwtServiceOptionsAbstract,
};

@Injectable()
export abstract class CheckAuthInterceptor<U> extends AuthInterceptor implements NestInterceptor {
  protected abstract domain: string;
  protected jwtOptions: JwtServiceOptionsAbstract = {};

  protected abstract getRequest(context: ExecutionContext): FastifyRequest;
  protected abstract getResponse(context: ExecutionContext): FastifyReply;
  protected abstract getUser(jwtPayload: unknown): Promise<U | null>;

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Observable<any>> {
    const request = this.getRequest(context);
    if (request.user) {
      return next.handle();
    }

    const token = this.extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    let user: U;
    try {
      const result = this.jwtService.verify(token, this.jwtOptions);
      user = await this.getUser(result);
      if (!user) {
        throw new UnauthorizedException();
      }
    } catch (_e) {
      throw new UnauthorizedException();
    }

    request.user = user;

    return next.handle();
  }
}