import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogInterceptor } from './interceptors/log.interceptor';
import * as dotenv from 'dotenv';
import { initializeFirebase } from './firebase.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();
initializeFirebase();

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Colibri')
    .setDescription('Documentação da API - Colibri.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LogInterceptor());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
