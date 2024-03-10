import {Body, Controller, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {User} from "./users.model";
import {UsersModule} from "./users.module";


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post("/registration")
    registration(@Body() userDto: CreateUserDto) {
        try {
            return this.userService.registration(userDto)
        } catch (error) {
            throw new HttpException({error: error.msg}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        try {
            return this.userService.login(userDto)
        } catch (error) {
            throw new HttpException({error: error.msg}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
