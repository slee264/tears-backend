require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: [process.env.DOMAIN, process.env.DOMAIN_2],
    credentials: true,
  }});
  app.use(cookieParser(process.env.COOKIE_SECRET));
  await app.listen(5000);
}
bootstrap();
