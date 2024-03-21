import {ApiProperty} from "@nestjs/swagger";
import {LoginUserDto} from "./login-user.dto";
import {IsEmail, IsString, Length} from "class-validator";

export class RegisterUserDto implements LoginUserDto{

    @ApiProperty({example: "user084213", description: "username"})
    @IsString({message: "Username has to be string"})
    @Length(3, 30, {message: "Username has to be from 3 to 30 characters"})
    readonly username: string

    @ApiProperty({example: "yura.ilchyshyn06@gmail.com", description: "email address"})
    @IsString({message: "Email has to be string"})
    @IsEmail({}, {message: "Incorrect email address"})
    @Length(3, 30, {message: "Email has to be from 3 to 30 characters"})
    readonly email: string

    @ApiProperty({example: "blueFlower", description: "password"})
    @Length(6, 50, {message: "Password has to be from 6 to 50 characters"})
    readonly password: string
}