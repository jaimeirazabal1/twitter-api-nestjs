import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TweetsModule } from './modules/tweets/tweets.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    //isGlobal es para no importarlo en los demas modulos para usarlo
    ConfigModule.forRoot({ isGlobal: true }),
    TweetsModule,
    DatabaseModule,
    UsersModule]
})

export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    //el mas, castea de string a number
    AppModule.port = +this.configService.get('PORT');
  }
}
