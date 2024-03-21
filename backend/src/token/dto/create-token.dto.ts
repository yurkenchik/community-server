import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateTokenDto {

    @ApiProperty({example: "dasdr0k3ke-d-03kdka0wdk9ak9sd0apfowe9o0fa90", description: "authorization token"})
    @IsString({message: 'Token has to be string'})
    token: string
}