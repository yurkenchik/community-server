import {Injectable, NestMiddleware, Next, Req, Res, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtWebsocketsMiddleware implements NestMiddleware {

    constructor(private jwtService: JwtService) {}
    UNAUTHORIZED_USER_MESSAGE = "user is not authorized"

    use(@Req() request, @Res() response, @Next() next) {

        const tokenResponse = request.handshake.headers.authorization
        console.log(tokenResponse)

        try {
            const bearer = tokenResponse.split(" ")[0]
            const token = tokenResponse.split(" ")[1]

            if (!token || bearer !== "bearer") {
                throw new UnauthorizedException(this.UNAUTHORIZED_USER_MESSAGE)
            }

            const decodedToken = this.jwtService.verify(token)
            request["user"] = decodedToken
            console.log(decodedToken)
            next()
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException(this.UNAUTHORIZED_USER_MESSAGE)
        }
    }
}