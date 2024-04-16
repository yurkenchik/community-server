import {HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res} from "@nestjs/common";
import * as process from "process";
import {JwtService} from "@nestjs/jwt";
import {NextFunction, Request, Response} from "express";

@Injectable()
export class JwtMiddleware implements NestMiddleware {

    constructor(private jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const token: string | undefined = req.headers.authorization.split(" ")[1]

        if (token) {
            try {
                const decoded = this.jwtService.verify(token) as { userId: string }
                req["user"] = decoded.userId
                next()
            } catch (error) {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}