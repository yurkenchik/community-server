import {IsNotEmpty} from "class-validator";


export class CreateRoomDto {

    @IsNotEmpty({message: "group name can not be empty"})
    readonly name: string

    readonly description: string
}