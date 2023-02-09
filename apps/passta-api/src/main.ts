import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationError } from 'class-validator';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({ origin: true });

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

  const port = process.env.PASSTA_API_PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/graphql`
  );
  Logger.log(
    `🚀 GraphiQL is running on: http://localhost:${port}/graphiql`
  );
}

bootstrap();
