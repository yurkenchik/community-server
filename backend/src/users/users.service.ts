import {HttpException, HttpStatus, Inject, Injectable, Param} from '@nestjs/common';
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) {
    }

    async findUserByEmail(dto: CreateUserDto) {
        const user = await this.userRepository.findOne({where: {email: dto.email}})
        return user
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        return user
    }
}
