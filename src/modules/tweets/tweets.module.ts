import { Module } from '@nestjs/common';
import { TwitsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { User } from '../users/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Tweet, User])],
    controllers: [TwitsController],
    providers: [TweetsService]
})
export class TweetsModule { }
