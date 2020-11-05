// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as compression from 'compression';
import helmet = require('helmet');

import { logger } from './common/logger';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { LoggingInterceptor, TransformInterceptor } from './common/interceptors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === 'production' ? logger : ['debug', 'error', 'log', 'verbose', 'warn'],
  });

  // app.use()   // 使用express的中间件与express相同;
  app.use(helmet());
  app.use(compression());

  // 静态资源目录
  app.useStaticAssets('./public');

  // 模板目录
  app.setBaseViewsDir('./views');
  app.setViewEngine('ejs');
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  if (process.env.NODE_ENV === 'deployment') {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '127.0.0.1:3001',
      package: 'nt_module_test',
      protoPath: join(__dirname, './nt_module_test.proto'),
    },
  });
  await app.startAllMicroservicesAsync();

  await app.listen(3000);

  console.log('listen on: http://127.0.0.1:3000');
}

bootstrap();
