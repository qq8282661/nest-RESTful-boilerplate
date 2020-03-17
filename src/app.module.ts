import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
    imports: [CatsModule, ConfigModule.forRoot({ isGlobal: true, load: [configuration], ignoreEnvFile: true })],
})
export class AppModule {}
