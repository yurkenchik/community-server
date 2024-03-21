import {Body, Controller, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: "Role creation"})
    @ApiResponse({status: 200})
    @Post("/create-role")
    createRole(@Body() dto: CreateRoleDto) {
        try {
            return this.rolesService.createRole(dto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting role by value"})
    @ApiResponse({status: 200})
    @Get("/:value")
    getByValue(@Param("value") value: string) {
        try {
            return this.rolesService.getRoleByValue(value)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
