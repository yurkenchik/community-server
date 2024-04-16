import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/users.model";

@Injectable()
export class TokenService {

    constructor(private jwtService: JwtService) {}

    async generateToken(userData: User) {
        const payload = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            password: userData.password,
            roles: userData.roles,
        }

        const token = await this.jwtService.sign(payload)
        console.log(typeof token)
        return {
            token: token
        }
    }
}