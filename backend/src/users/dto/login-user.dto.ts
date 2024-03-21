import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsEmpty, IsNotEmpty, IsString, Length} from "class-validator";
import {RegisterUserDto} from "./register-user.dto";


export class LoginUserDto {


    @ApiProperty({example: "yura.ilchyshyn06@gmail.com", description: "email address"})
    @IsString({message: "Email has to be string"})
    @IsEmail({}, {message: "Incorrect email address"})
    @IsNotEmpty({message: "Email can not be empty"})
    readonly email: string

    @ApiProperty({example: "blueFlower", description: "password"})
    @IsString({message: "Password has to be string"})
    @Length(6, 50, {message: "Password has to be from 6 to 50 characters"})
    readonly password: string
}