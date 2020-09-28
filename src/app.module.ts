import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';

import devConfig from './config/dev.config';
import prodConfig from './config/production.config';
import defaultConfig from './config/default.config';
import { GrpcClientFactory } from './grpc/grpc.client-factory';

import { CatsController } from './cat/cats.controller';
import { UsersController } from './user/users.controller';

import { CatsService } from './cat/cats.service';
import { UsersService } from './user/user.service';

import { User } from './user/user.entity';

import { Cat } from './cat/cat.entity';
import { Profile } from './profile/profile.entity';

const configPrams = { isGlobal: true, ignoreEnvFile: true, load: [] };
configPrams.load = [() => ({ ...defaultConfig() })];

if (env.NODE_ENV === 'development') {
  console.log(env.NODE_ENV);
  configPrams.load = [() => ({ ...defaultConfig(), ...devConfig() })];
}

if (env.NODE_ENV === 'production') {
  console.log(env.NODE_ENV);
  configPrams.load = [() => ({ ...defaultConfig(), ...prodConfig() })];
}

@Module({
  imports: [
    ConfigModule.forRoot(configPrams),

    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService): Promise<any> => ({
        type: config.get('database.type'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        synchronize: config.get('database.synchronize'),
        logging: config.get('database.logging'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        dropSchema: config.get('database.dropSchema'),
        timezone: '+08:00',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Cat, Profile]),
  ],
  controllers: [CatsController, UsersController],
  providers: [GrpcClientFactory, CatsService, UsersService],
})
export class AppModule {}
