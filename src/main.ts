import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(express())
  );

  // Configura el middleware express.static para servir archivos estáticos desde /public
  app.use(express.static('public'));

  await app.listen(3000);
}
bootstrap();