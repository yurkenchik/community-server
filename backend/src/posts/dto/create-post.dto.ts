import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {

    @ApiProperty({example: "university", description: "topic name"})
    @IsNotEmpty({message: "topic name is required"})
    @IsString({message: "topic has to be string"})
    readonly title: string

    @ApiProperty({example: "I saw the stats that about 40% of students...", description: "post content"})
    @IsNotEmpty({message: "Post content filed is required"})
    @IsString({message: "content has to be string"})
    readonly content: string

}