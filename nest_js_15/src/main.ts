import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from '@nestjs/config';
import {config} from 'aws-sdk';


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



  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest JS - Devtrio Blogs Api Services')
    .setDescription('The base API URL http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .addServer('http://localhost:8080')
    .setVersion('1.0').build()

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);



  // aws config
  const configService = app.get(ConfigService);
  config.update({
    region: configService.get('environment.awsRegion'),
    credentials: {
      accessKeyId:  configService.get('environment.awsAccessKeyId'),
      secretAccessKey: configService.get('environment.awsSecretAccessKey')
    },
  })

  app.enableCors()
  await app.listen(8080);
  console.log(`Listening on port 8080`);

}
bootstrap();
