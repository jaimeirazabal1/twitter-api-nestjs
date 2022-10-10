import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetDtoTs, PaginationQueryDto } from './dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { User } from '../users/entities';

@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweet) private readonly TweetRepository: Repository<Tweet>,
        @InjectRepository(User) private readonly UserRepository: Repository<User>
    ) { }

    async getTweets({ limit, offset }: PaginationQueryDto): Promise<Tweet[]> {
        return await this.TweetRepository.find({ relations: ['user'], skip: offset, take: limit });
    }

    async getTweet(id: number): Promise<Tweet> {
        const tweet: Tweet = await this.TweetRepository.findOne({ where: { id: id }, relations: ['user'] });
        if (!tweet) {
            throw new NotFoundException("Resource not found")
        }
        return tweet
    }

    async createTweet({ message, user }: CreateTweetDtoTs) {
        const tweet: Tweet = this.TweetRepository.create({ message, user });
        return this.TweetRepository.save(tweet);
    }

    async updateTweet(id: number, { message }: UpdateTweetDto) {
        const tweet: Tweet = await this.TweetRepository.preload({ id, message });
        await this.TweetRepository.save(tweet);
        if (!tweet) {
            throw new NotFoundException('Resource not found')
        }
        return tweet;
    }

    async removeTweet(id: number): Promise<void> {
        const tweet: Tweet = await this.TweetRepository.findOne({ where: { id: id } });
        if (!tweet) {
            throw new NotFoundException("Resource not found")
        }
        this.TweetRepository.remove(tweet);

    }
}
