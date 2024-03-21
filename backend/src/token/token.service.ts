import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/users.model";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateTokenDto} from "./dto/create-token.dto";
import {Role} from "../roles/roles.model";

@Injectable()
export class TokenService {

    constructor(private jwtService: JwtService) {}

    async generateToken(userData: User) {
        const payload = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
        }

        const token = await this.jwtService.sign(payload)
        console.log(typeof token)
        return {
            token: token
        }
    }
}