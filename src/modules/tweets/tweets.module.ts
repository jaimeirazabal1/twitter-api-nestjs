import { Module } from '@nestjs/common';
import { TwitsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
    controllers: [TwitsController],
    providers: [TweetsService]
})
export class TweetsModule { }
