import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TweetsModule } from './modules/tweets/tweets.module';

@Module({
  imports: [TweetsModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'password',
    logging: false,
    database: 'database',
    autoLoadEntities: true,
    synchronize: true, //solo para desarrollo porque se cambia la base de datos en cualquier cambio
  })]
})

export class AppModule { }
