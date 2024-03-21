import {
    Body,
    Controller,
    Delete,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    Res,
    UsePipes, ValidationPipe
} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterUserDto} from "../users/dto/register-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateTokenDto} from "../token/dto/create-token.dto";
import {LoginUserDto} from "../users/dto/login-user.dto";


@ApiTags("Authorization")
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: "Registration"})
    @ApiResponse({status: 200})
    @UsePipes(ValidationPipe)
    @Post("/registration")
    registration(@Body() userDto: RegisterUserDto) {
        return this.authService.registration(userDto)
    }

    @ApiOperation({summary: "login"})
    @ApiResponse({status: 200})
    @Post("/login")
    login(@Body() userDto: RegisterUserDto) {
        try {
            return this.authService.login(userDto)
        } catch (error) {
            console.log(error.message)
            throw new HttpException("Server error, something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary:  "Account deleting"})
    @ApiResponse({status: 200})
    @Delete("/delete-account/:id")
    delete(@Param("id") dto: CreateTokenDto) {
    }
}
