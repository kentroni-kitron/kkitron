import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';

@Injectable()
export class CheckAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context)
    return gqlContext.getContext().req
  }

  handleRequest<TUser = User>(
    error: unknown,
    user: User,
    info: unknown,
    context: ExecutionContext,
  ): TUser {
    if (!user || info || error) {
      const context_ = GqlExecutionContext.create(context)
      const reply = context_.getContext().reply

      reply.setCookie('access-token', '')
      reply.setCookie('access-token-expires', '')

      throw error || new UnauthorizedException()
    }

    return user as TUser;
  }
}
