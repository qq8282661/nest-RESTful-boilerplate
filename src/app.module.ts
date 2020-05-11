import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from '../config/dev.config';
import prodConfig from '../config/production.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';

const configPrams = { isGlobal: true, ignoreEnvFile: true, load: [] };

if (env.NODE_ENV === 'development') {
  console.log(env.NODE_ENV);
  configPrams.load = [devConfig];
}

if (env.NODE_ENV === 'production') {
  console.log(env.NODE_ENV);
  configPrams.load = [prodConfig];
}

@Module({
  imports: [
    ConfigModule.forRoot(configPrams),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: config.get('database.type'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: config.get('database.entities'),
        synchronize: config.get('database.synchronize'),
        logging: config.get('database.logging'),
      }),
      inject: [ConfigService],
    }),
    CatsModule,
  ],
})
export class AppModule {}
