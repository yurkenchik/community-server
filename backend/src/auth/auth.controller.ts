import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {ApiTags} from "@nestjs/swagger";


@ApiTags("Authorization")
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("/registration")
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }
}
