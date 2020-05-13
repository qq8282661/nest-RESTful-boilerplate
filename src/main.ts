// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const assetsPath = join(__dirname, '..', 'public');
  console.log(assetsPath);
  // 静态资源目录
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // 模板目录
  app.setBaseViewsDir('./views');
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors();
  await app.listen(3000);

  console.log('listen on: http://127.0.0.1:3000');
}
bootstrap();
