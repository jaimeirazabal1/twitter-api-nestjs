import { IsString } from "class-validator";

export class CreateTweetDtoTs {
    @IsString()

    readonly message: string;
}
