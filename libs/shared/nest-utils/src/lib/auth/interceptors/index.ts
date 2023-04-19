declare module 'fastify' {
  export interface FastifyRequest {
    user?: unknown;
    token?: unknown;
    tokenExpires?: unknown;
  }
}

export * from './set-auth.interceptor';
export * from './unset-auth.interceptor';
export * from './check-auth.interceptor';
export * from './refresh-auth.interceptor';
