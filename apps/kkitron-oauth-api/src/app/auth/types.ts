import type { FastifyReply, FastifyRequest } from 'fastify';

import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';

export interface UserContext {
  reply: FastifyReply,
  request: FastifyRequest,
  user: User,
};

export type UserJwtPayload = false | { id: string, email: string };
