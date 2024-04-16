import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateCommentDto {

    @ApiProperty({example: "your post is so cool", description: "post comment"})
    @IsNotEmpty({message: "write something"})
    readonly content: string

}