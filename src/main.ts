import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DispatchError } from './common/dispatch-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DispatchError());
  const config = new DocumentBuilder()
    .setTitle('Signing API')
    .setDescription('Signing API')
    .setVersion('1.0')
    .addTag('signings')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('v1', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
