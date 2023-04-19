import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest, FastifyReply } from 'fastify';

import { isObject } from '@kkitron/shared/utils';

import { AuthInterceptor } from './auth.interceptor';
import {
  JwtServiceOptionsAbstract,
  UsersServiceAbstract,
} from '../../utils';

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
  protected abstract usersService: UsersServiceAbstract<U>;
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
    if (request.user) {
      return next.handle();
    }

    const token = this.extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    let email: string;
    try {
      const result = this.jwtService.verify(token, this.jwtOptions);
      if (!isObject<{ email: string }>(result, { email: String })) {
        throw new UnauthorizedException();
      }

      email = result.email;
    } catch (_e) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = user;

    return next.handle();
  }
}