import {HttpException, HttpStatus, Injectable, NestMiddleware, Next, Request, Response} from "@nestjs/common";
import * as process from "process";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtMiddleware implements NestMiddleware {

    constructor(private jwtService: JwtService) {}

    use(@Request() req, @Response() res, @Next() next) {
        const token: string | undefined = req.headers.authorization.split(" ")[1]

        if (token) {
            try {
                const decoded = this.jwtService.verify(token) as { userId: string }
                req["user"] = decoded.userId
                console.log(decoded)
                next()
            } catch (error) {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
        next()
    }
}