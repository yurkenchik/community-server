import {IsNotEmpty} from "class-validator";


export class UpdateCommentDto {

    @IsNotEmpty({message: "You have to write something"})
    readonly content: string

}