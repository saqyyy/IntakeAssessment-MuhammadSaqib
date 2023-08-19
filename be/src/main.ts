import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe()) 
    await app.listen(process.env.NODE_SERVICE_PORT);
}
bootstrap();
