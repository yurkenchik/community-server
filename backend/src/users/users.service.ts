import {HttpException, HttpStatus, Inject, Injectable, Param} from '@nestjs/common';
import {User} from "./users.model";
import {RegisterUserDto} from "./dto/register-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LoginUserDto} from "./dto/login-user.dto";
import {RemoveUserDto} from "./dto/remove-user.dto";
import {Role} from "../roles/roles.model";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import * as http from "http";
import {GetUserByIdDto} from "./dto/get-user-by-id.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private rolesService: RolesService) {
    }

    async findUserByEmail(dto: LoginUserDto) {
        const user = await this.userRepository.findOne({where: {email: dto.email}})
        return user
    }

    async createUser(dto: RegisterUserDto) {
        const userData = await this.userRepository.create(dto)

        const role = await this.rolesService.getRoleByValue("USER")

        if (role === null) {
            throw new HttpException("User role does not exist", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        userData.roles = [role]

        const savedUserToDB = await this.userRepository.save(userData)

        return savedUserToDB
    }

    async getUsers() {
        const users = await this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.roles", "role")
            .getMany()
        return users
    }

    async removeAccount(dto: RemoveUserDto) {
        const existingUser = await this.userRepository.findOne({where: {id: dto.id}})

        if (!existingUser) {
            throw new HttpException("User is not found", HttpStatus.BAD_REQUEST)
        }

        const removedUser = await this.userRepository.remove(existingUser)
        return removedUser
    }

    async addRole(dto: AddRoleDto) {
        try {

            const userData = await this.userRepository.findOneOrFail({
                where: {id: dto.userId},
                relations: ["roles"]
            })
            const role = await this.rolesService.getRoleByValue(dto.value)
            if (role) {
                throw new HttpException(`User already has a role ${role.value}`, HttpStatus.BAD_REQUEST)
            }

            console.log(userData)
            console.log(role)

            if (role && userData) {
                userData.roles = [ ...userData.roles, role ]
                await this.userRepository.save(userData)
                return dto
            }

        } catch (error) {
            console.log(`error adding role: ${error}`)
            throw new HttpException("User or role is not found", HttpStatus.NOT_FOUND)

        }
    }

    async getAdminRole(dto: AddRoleDto) {

        const userData = await this.userRepository.findOne({
            where: {id: dto.userId},
            relations: ["roles"]
        })
        console.log(userData)
        const role = await this.rolesService.getRoleByValue("ADMIN")
        console.log(role)

        if (!userData) {
            throw new HttpException("User is not found", HttpStatus.NOT_FOUND)
        }

        if (!role) {
            throw new HttpException("Admin role does not exists", HttpStatus.NOT_FOUND)
        }

        console.log(userData.roles)

        userData.roles = [ ...userData.roles, role ]

        const savedUserToDB = await this.userRepository.save(userData)

        return savedUserToDB

    }

    async getUserById(dto: GetUserByIdDto) {
        const user = await this.userRepository.findOne({
            where: {id: dto.userId},
            relations: ["roles"]
        })
        return user
    }

}
