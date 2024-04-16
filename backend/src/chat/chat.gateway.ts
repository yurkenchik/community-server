import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from "socket.io";
import {CreateMessageDto} from "./dto/create-message.dto";
import {Req, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {JwtWebsocketsGuard} from "./jwt-websockets.guard";
import {JwtService} from "@nestjs/jwt";


@WebSocketGateway({
  namespace: "chat",
  cors: {
    origin: "*"
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private jwtService: JwtService) {
  }

  @WebSocketServer()
  server: Server

  // @UseGuards(JwtWebsocketsGuard)
  @UsePipes(ValidationPipe)
  handleConnection(client: Socket, @Req() request) {
    try {
      console.log(request)
      const tokenParams = client.handshake.headers.authorization
      const token = tokenParams.split(" ")[1]
      const decodedToken = this.jwtService.verify(token, { secret: "secret" })
      const username = decodedToken.username
      console.log(`client with username: ${username} connected`)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  handleDisconnect(client: Socket) {
    try {
      console.log(`Client with id: ${client.id} disconnected`)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  @UsePipes(ValidationPipe)
  @SubscribeMessage("new-message")
  handleMessage(client: Socket, messageDto: CreateMessageDto) {
    try {
      const author = client["username"]
      const message = {
        author: author,
        content: messageDto
      }
      this.server.emit("message", message)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

}
