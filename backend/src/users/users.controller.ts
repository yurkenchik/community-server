import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post, Req, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {RegisterUserDto} from "./dto/register-user.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RoleGuard} from "../auth/role.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {GetUserByIdDto} from "./dto/get-user-by-id.dto";
import {Role} from "../roles/roles.model";
import {BanUserDto} from "./dto/ban-user.dto";
import {JwtMiddleware} from "../middlewares/jwt.middleware";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: "User creation"})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post("/create-user")
    createUser(@Body() userDto: RegisterUserDto) {
        try {
            return this.userService.createUser(userDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting all users"})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Get("/get-users")
    getUsers() {
        try {
            return this.userService.getUsers()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Giving a role"})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    @Post("/add-role")
    addRole(@Body() dto: AddRoleDto) {
        try {
            return this.userService.addRole(dto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Banning"})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    @Post("/ban-user")
    banUser(@Body() dto: BanUserDto) {
        try {
            return this.userService.banUser(dto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Receiving admin role"})
    @ApiResponse({status: 200, type: Role})
    @UseGuards(JwtAuthGuard)
    @Post("/get-admin-role/:id")
    getAdminRole(@Param("id") userId: AddRoleDto) {
        try {
            return this.userService.getAdminRole(userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting user by id"})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Get("/get-user/:id")
    getUserById(@Param("id") userId: string) {
        try {
            return this.userService.getUserById(userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
