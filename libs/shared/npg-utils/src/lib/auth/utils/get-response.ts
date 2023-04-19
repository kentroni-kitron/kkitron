import { ExecutionContext } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getResponse = (context: ExecutionContext): FastifyReply => {
  const gqlContext = GqlExecutionContext.create(context);
  return gqlContext.getContext().reply;
};
