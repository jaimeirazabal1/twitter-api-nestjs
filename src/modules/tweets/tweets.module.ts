import { Module } from '@nestjs/common';
import { TwitsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tweet])],
    controllers: [TwitsController],
    providers: [TweetsService]
})
export class TweetsModule { }
