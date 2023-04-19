import { Injectable } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

import { MINUTE_MS, DAY_MS, SECOND_MS } from '@kkitron/shared/utils';

import { JwtServiceAbstract, JwtServiceOptionsAbstract } from '../../utils';

@Injectable()
export abstract class AuthInterceptor {
  protected abstract jwtService: JwtServiceAbstract;

  protected extractTokenFromCookies(
    request: FastifyRequest,
    tokenId: string,
  ): string | null {
    const cookie = request.cookies?.[tokenId];
    if (!cookie) {
      return null;
    }

    return request.unsignCookie(cookie)?.value ?? null;
  }

  protected extractBearerToken(request: FastifyRequest) {
    const header = request.headers.authorization ?? request.headers['Authorization'];
    return header?.toString()?.replace(/^Bearer /, '') ?? null;
  }

  // Access token should be passed in the response from the controller/resolver
  protected setAccessToken(
    request: FastifyRequest,
    expiresMn: number,
    jwtOptions: JwtServiceOptionsAbstract,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any,
  ) {
    const expiresMs = expiresMn * MINUTE_MS;
    const expiresSc = expiresMs / SECOND_MS;
    const expiresAt = Date.now() + expiresMs;
    const token = this.jwtService.sign(payload, {
      expiresIn: expiresSc,
      ...jwtOptions,
    });

    request.token = token;
    request.tokenExpires = expiresAt.toString();
  }

  protected setRefreshToken(
    response: FastifyReply,
    expiresDs: number,
    jwtOptions: JwtServiceOptionsAbstract,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any,
    domain: string,
  ) {
    const expiresMs = expiresDs * DAY_MS;
    const expiresSc = expiresMs / SECOND_MS;
    const expiresAt = new Date(Date.now() + expiresMs);
    const token = this.jwtService.sign(payload, {
      expiresIn: expiresSc,
      ...jwtOptions,
    });

    response.setCookie('refresh-token', token, {
      expires: expiresAt,
      signed: true,
      domain,
      httpOnly: true,
    });
    response.setCookie('refresh-token-expires', expiresAt.getTime().toString(), {
      expires: expiresAt,
      domain,
      httpOnly: true,
    });
  }

  protected unsetRefreshToken(response: FastifyReply, domain: string) {
    response.setCookie('refresh-token', '', { domain, httpOnly: true });
    response.setCookie('refresh-token-expires', '', { domain, httpOnly: true });
  }
}