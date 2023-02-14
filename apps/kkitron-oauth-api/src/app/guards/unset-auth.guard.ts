import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';

@Injectable()
export class UnsetAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }

  handleRequest<TUser = User>(
    error: unknown,
    user: User,
    info: unknown,
    context: ExecutionContext,
  ): TUser {
    console.log('user: ', user);
    if (!user || info || error) {
      throw error || new UnauthorizedException();
    }

    // TODO: force-expire access-token & refresh-token

    const context_ = GqlExecutionContext.create(context);
    const reply = context_.getContext().reply;

    reply.setCookie('access-token', '');
    reply.setCookie('access-token-expires', '');
    reply.setCookie('refresh-token', '');
    reply.setCookie('refresh-token-expires', '');

    return user as TUser;
  }
}