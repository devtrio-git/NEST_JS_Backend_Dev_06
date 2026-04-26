import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions:{
      enableImplicitConversion: true,
    }
  }));

  // Api documentation
  const config = new DocumentBuilder()
    .setTitle('NEST JS - Devtrio Blogs APIs Services')
    .setDescription('The base API URL http://localhost:8080')
    .setTermsOfService('http://localhost:8080/terms-of-service')
    .addServer('http://localhost:8080')
    .setVersion('1.0.0').build()
  const  document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
  console.log(`Listening on port 8080`);
}
bootstrap();
