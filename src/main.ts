import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,//filter request properties
    forbidNonWhitelisted: true, //validate request properties and send bad request
    transformOptions: {
      enableImplicitConversion: true // nos aseguramos que los tipos que se envian por parametro en los query sean correctos. Es como un casteo
    }
  }));

  await app.listen(AppModule.port);
}
bootstrap();
