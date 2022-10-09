import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';


import { CreateTweetDtoTs } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet } from './tweet.entity';
import { TweetsService } from './tweets.service';


@Controller('twits')
export class TwitsController {

    constructor(private readonly tweetService: TweetsService) {

    }

    @Get()
    getTuits(@Query() filterQuery): Tweet[] {
        const { searchTerm, orderBy } = filterQuery;
        return this.tweetService.getTweets();
    }

    @Get('/:id') //twits/1
    getTweet(@Param('id') id: number): Tweet {
        return this.tweetService.getTweet(id);
    }

    @Post()
    createTweet(@Body() message: CreateTweetDtoTs): void {
        return this.tweetService.createTweet(message);
    }

    @Patch(':id')
    updateTweet(@Param('id') id: number, @Body() message: UpdateTweetDto): Tweet {
        return this.tweetService.updateTweet(id, message);
    }

    @Delete(':id')
    removeTweet(@Param('id') id: number): void {
        return this.tweetService.removeTweet(id);
    }
}
