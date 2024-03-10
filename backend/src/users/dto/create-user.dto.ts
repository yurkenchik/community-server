import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: "user084213", description: "username"})
    readonly username?: string

    @ApiProperty({example: "yura.ilchyshyn06@gmail.com", description: "email address"})
    readonly email: string

    @ApiProperty({example: "blueFlower", description: "password"})
    readonly password: string

}