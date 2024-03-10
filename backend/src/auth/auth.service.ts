import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async generateToken(userData: User) {
        const payload = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            password: userData.password
        }

        const token = this.jwtService.sign(payload)

        return {
            token: token
        }
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.userService.findUserByEmail(dto)
        const isPasswordEqual = await bcrypt.compare(dto.password, user.password)

        if (user && isPasswordEqual) {
            return user
        }

        throw new UnauthorizedException({message: "Incorrect email or password"})
    }

    async registration(dto: CreateUserDto) {
        const emailCandidate = await this.userService.findUserByEmail(dto)

        if (emailCandidate) {
            throw new HttpException("User with this email already exists", HttpStatus.BAD_REQUEST)
        }

        const hashedPassword = await bcrypt.hash(dto.password, 4)
        const user = await this.userService.createUser({ ...dto, password: hashedPassword })
        return this.generateToken(user)
    }

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

}
