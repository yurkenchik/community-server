import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {RegisterUserDto} from "../users/dto/register-user.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {LoginUserDto} from "../users/dto/login-user.dto";
import {TokenService} from "../token/token.service";

interface IToken {
    token: string
}

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService,
                private tokenService: TokenService) {}

    private async validateUser(dto: LoginUserDto) {

        const unauthorizedMessage = "Incorrect email or password"
        const user = await this.userService.findUserByEmail(dto)
        console.log(typeof user)
        console.log(user)
        const isPasswordEqual = await bcrypt.compare(dto.password, user.password)

        console.log(`is password correct: ${isPasswordEqual}`)
        if (user && isPasswordEqual) {
            return user
        }

        throw new UnauthorizedException({message: unauthorizedMessage})

    }

    async registration(dto: RegisterUserDto) {

        const emailCandidate = await this.userService.findUserByEmail(dto)

        if (emailCandidate) {
            throw new HttpException("User with this email already exists", HttpStatus.BAD_REQUEST)
        }

        const hashedPassword = await bcrypt.hash(dto.password, 4)
        const user = await this.userService.createUser({ ...dto, password: hashedPassword })
        const generateToken = await this.tokenService.generateToken(user)

        return [ generateToken, user ]
    }

    async login(dto: RegisterUserDto) {
        const user = await this.validateUser(dto)
        const generateToken = await this.tokenService.generateToken(user)

        return [ generateToken, user ]
    }

    async getUserIdByToken(token: string): Promise<string> {
        try {
            const decodedToken = this.jwtService.verify(token)

            const userId = decodedToken.id
            return userId
        } catch (error) {
            console.log(error.message)
            throw new Error("Invalid token")
        }

    }
}
