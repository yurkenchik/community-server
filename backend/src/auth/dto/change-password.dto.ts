import {IsEmail, IsNotEmpty} from "class-validator";

export class ChangePasswordDto {

    @IsNotEmpty({message: "Email is required"})
    @IsEmail()
    readonly email: string
}