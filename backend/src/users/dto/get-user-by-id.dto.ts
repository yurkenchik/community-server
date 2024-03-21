import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GetUserByIdDto {

    @ApiProperty({example: "4134-s4df-323", description: "user id"})
    @IsNotEmpty({message: "id is required"})
    userId: string
}