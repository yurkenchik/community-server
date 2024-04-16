import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Chatroom} from "./models/chatroom.model";
import {Message} from "./models/message.model";
import {ConnectedUser} from "./models/connected-user.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [],
    providers: [ChatGateway],
    imports: [
        JwtModule,
        TypeOrmModule.forFeature([
            Message,
            Chatroom,
            ConnectedUser
        ])
    ],
    exports: [
        TypeOrmModule
    ]
})
export class ChatModule {}