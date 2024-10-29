import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';
import { swagger } from './services/swagger';

import * as cookieParser from 'cookie-parser';

config();

async function bootstrap() {
  const PORT = process.env.PORT || 3100;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  swagger(app);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);

  Logger.log(`Server running on PORT ${PORT}`, 'Bootstrap');
  Logger.log(`Swagger running on /docs`, 'Bootstrap');
}
bootstrap();
