import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { Tweet } from 'src/modules/tweets/tweet.entity';
import { TweetsService } from 'src/modules/tweets/tweets.service';
import { CreateTweetDtoTs } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';


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
    getTweet(@Param('id') id: string): Tweet {
        return this.tweetService.getTweet(id);
    }

    @Post()
    createTweet(@Body() message: CreateTweetDtoTs): void {
        return this.tweetService.createTweet(message);
    }

    @Patch(':id')
    updateTweet(@Param('id') id: string, @Body() message: UpdateTweetDto): Tweet {
        return this.tweetService.updateTweet(id, message);
    }

    @Delete(':id')
    removeTweet(@Param('id') id: string): void {
        return this.tweetService.removeTweet(id);
    }
}
