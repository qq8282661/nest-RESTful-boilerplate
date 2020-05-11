import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import devConfig from '../config/dev.config';
import prodConfig from '../config/production.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';

const configPrams = { isGlobal: true, ignoreEnvFile: true, load: [] };

if (env.NODE_ENV === 'development') {
  configPrams.load = [devConfig];
}

if (env.NODE_ENV === 'production') {
  configPrams.load = [prodConfig];
}

@Module({
  imports: [
    ConfigModule.forRoot(configPrams),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      synchronize: true,
      entities: ['src/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: true,

      dropSchema: true,
    }),
    CatsModule,
  ],
})
export class AppModule {}
