import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {

    @ApiProperty({example: "41341-42340--43241mds-34", description: "user id"})
    @IsString()
    readonly userId: string

    @ApiProperty({example: "User is banned for cheating", description: "banning"})
    @IsString()
    readonly banReason: string
}