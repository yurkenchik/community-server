import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class FindPostByIdDto {

    @ApiProperty({example: "423-fs3423ds-d34", description: "post id"})
    @IsNotEmpty({message: "id can not be empty"})
    readonly id: string
}