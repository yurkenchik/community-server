import {ApiProperty} from "@nestjs/swagger";


export class LoginUserDto {

    @ApiProperty({example: "user840134", description: "username"})
    username?: string

    @ApiProperty({example: "yura@gmail.com", description: "email address"})
    email: string

    @ApiProperty({example: "blueFlower", description: "password"})
    password: string
}