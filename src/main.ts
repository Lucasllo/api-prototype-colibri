import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogInterceptor } from './interceptors/log.interceptor';
import * as dotenv from 'dotenv';
import { initializeFirebase } from './firebase.config';

dotenv.config();
initializeFirebase();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LogInterceptor());
  await app.listen(3000);
}
bootstrap();
