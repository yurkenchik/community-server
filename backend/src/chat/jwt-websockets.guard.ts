import {CanActivate, ExecutionContext, Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";


@Injectable()
export class JwtWebsocketsGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    UNAUTHORIZED_USER_MESSAGE: string = "user is not authorized"

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToWs().getClient()

        try {
            const tokenResponse = request.handshake.headers.authorization
            const token = tokenResponse.split(" ")[0]
            const bearer = tokenResponse.split(" ")[1]

            if (!token || bearer !== "bearer") {
                throw new UnauthorizedException(this.UNAUTHORIZED_USER_MESSAGE)
            }

            const decodedToken = this.jwtService.verify(token)
            request["user"] = decodedToken
            return true
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException(this.UNAUTHORIZED_USER_MESSAGE)
        }

    }
}