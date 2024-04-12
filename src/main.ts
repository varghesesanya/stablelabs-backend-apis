import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Adds a Search Filter By Tag
  const swaggerOptions = {
    swaggerOptions: {
      displayRequestDuration: true,
      filter: true,
      showCommonExtensions: true,
    },
  };
  

  const config = new DocumentBuilder()
    .setTitle('Stable Labs Backend APIs')
    .setDescription('Stable Labs Backend APIs - A multichain backend support')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, swaggerOptions);

  
  await app.listen(process.env.APP_PORT);
}
bootstrap();
