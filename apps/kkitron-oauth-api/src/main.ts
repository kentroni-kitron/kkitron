import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationError } from 'class-validator';
import fastifyCookie from '@fastify/cookie';
import secureSession from '@fastify/secure-session';

import { AppModule } from './app/app.module';
import { LogExecutionTimeInterceptor } from './app/log-execution-time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyCookie, { secret: process.env.KKITRON_OAUTH_COOKIE_SECRET });
  await app.register(secureSession, {
    secret: process.env.KKITRON_OAUTH_SESSION_SECRET,
    salt: process.env.KKITRON_OAUTH_SESSION_SALT,
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: process.env.NODE_ENV === 'development'
        ? (errors: Array<ValidationError>) => {
          const errorMessages = errors.map(error => {
            return Object.values(error.constraints);
          });

          return new BadRequestException(errorMessages.join(', '));
        }
        : () => 'Internal Error',
    }),
  );

  app.useGlobalInterceptors(new LogExecutionTimeInterceptor());

  const port = process.env.KKITRON_OAUTH_API_PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/graphql`
  );
  Logger.log(
    `🚀 GraphiQL is running on: http://localhost:${port}/graphiql`
  );
}

bootstrap();
