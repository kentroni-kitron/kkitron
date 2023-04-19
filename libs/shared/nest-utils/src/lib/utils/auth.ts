import { FastifyRequest } from 'fastify';

import { isObject } from '@kkitron/shared/utils';

export type AuthServiceAbstract<T> = {
  validateUser: (email: string, password: string) => Promise<T>,
};

export type UsersServiceAbstract<T> = {
  findByEmail: (email: string) => Promise<T | undefined | null>,
  findById: (id: string) => Promise<T | undefined | null>,
};

export type JwtServiceOptionsAbstract = {
  secret?: string | Buffer,
  privateKey?: string | Buffer,
  expiresIn?: number | string,
};

export type JwtServiceAbstract = {
  sign: (
    payload: string | object | Buffer,
    options?: JwtServiceOptionsAbstract,
  ) => string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verify: <T extends object = any>(token: string, options?: JwtServiceOptionsAbstract) => T,
};

export type AuthLoginRequestBody = { email: string, password: string };

export type AuthLoginRequest = FastifyRequest<{
  Body: AuthLoginRequestBody,
}>;

export const isAuthLoginRequest = (input: FastifyRequest): input is AuthLoginRequest => {
  return isObject<AuthLoginRequestBody>(input.body, { email: String, password: String });
};
