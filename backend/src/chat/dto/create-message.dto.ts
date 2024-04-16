import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateMessageDto {

    @ApiProperty({example: "hi, how are you?", description: "message content"})
    @IsNotEmpty({message: "write something"})
    readonly content: string

}