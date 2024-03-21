import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {

    @ApiProperty({example: "41341-432dsd-4324sd-43", description: "user id"})
    @IsString()
    readonly userId: string

    @ApiProperty({example: "ADMIN", description: "administrator"})
    @IsString()
    readonly value: string
}