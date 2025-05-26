import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const config = new DocumentBuilder()
    .setTitle('Employee example')
    .setDescription('The Employee API description')
    .setVersion('1.0')
    .build();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);


  app.useGlobalPipes(new ValidationPipe)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
