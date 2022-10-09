import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetDtoTs } from './dto';
import { Tweet } from './tweet.entity';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetsService {
    private tweets: Tweet[] = [
        {
            id: 1,
            message: 'Hello world from from nest.js 😘'
        }
    ];

    getTweets(): Tweet[] {
        return this.tweets;
    }

    getTweet(id: number): Tweet {
        const tweet = this.tweets.find((item) => item.id === id);
        if (!tweet) {
            throw new NotFoundException("Resource not found")
        }
        return tweet
    }

    createTweet({ message }: CreateTweetDtoTs) {
        this.tweets.push({
            id: (Math.floor(Math.random() * 2000) + 1),
            message
        })
    }

    updateTweet(id: number, { message }: UpdateTweetDto) {
        const tweet: Tweet = this.getTweet(id);
        tweet.message = message;
        return tweet;
    }

    removeTweet(id: number) {
        const index = this.tweets.findIndex((tweet) => tweet.id === id);
        if (index >= 0) {
            this.tweets.splice(index, 1)
        }
    }
}
