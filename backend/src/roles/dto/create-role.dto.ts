import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateRoleDto {

    @ApiProperty({example: "ADMIN", description: "administrator"})
    @IsString()
    readonly value: string

    @ApiProperty({example: "administrator", description: "role description"})
    @IsString()
    readonly description: string

}