import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';

export const getRequest = (context: ExecutionContext, inputId?: string): FastifyRequest => {
  const gqlContext = GqlExecutionContext.create(context);
  const request = gqlContext.getContext().req;

  if (inputId) {
    request.body = gqlContext.getArgs()[inputId];
  }

  return request;
};
