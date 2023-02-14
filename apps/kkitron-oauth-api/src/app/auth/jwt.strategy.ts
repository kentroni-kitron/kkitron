import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';

import { UserJwtPayload } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.KKITRON_OAUTH_JWT_SECRET,
      jsonWebTokenOptions: { algorithms: ['HS256'] },
    });
  }

  async validate(payload: { id?: string, email?: string }): Promise<UserJwtPayload> {
    const { id, email } = payload;
    if (!id || !email) {
      return false;
    }

    return { id, email };
  }
}

const cookieExtractor = (request: FastifyRequest): string | null => {
  const { 'access-token': accessToken } = request.cookies ?? {};
  if (!accessToken) {
    return null;
  }

  const unsignedCookieToken = request.unsignCookie(accessToken);
  return unsignedCookieToken?.value || null;
}
