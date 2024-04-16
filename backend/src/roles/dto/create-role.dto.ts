import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateRoleDto {

    @ApiProperty({example: "ADMIN", description: "administrator"})
    @IsNotEmpty({message: "role name is required"})
    @IsString()
    readonly value: string

    @ApiProperty({example: "administrator", description: "role description"})
    @IsNotEmpty({message: "role description is required"})
    @IsString()
    readonly description: string

}