import {IsString} from "class-validator";
import {APP_GUARD} from "@nestjs/core";
import {ApiProperty} from "@nestjs/swagger";


export class RemoveUserDto {

    @ApiProperty({example: "2314da234-das214s-da2", description: "id"})
    @IsString()
    id: string
}