import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "../../models/message.model";
import {Repository} from "typeorm";
import {CreateMessageDto} from "../../dto/create-message.dto";
import {ChatRoomService} from "../chatRoom/chat-room.service";


@Injectable()
export class MessageService {

    constructor(@InjectRepository(Message)
                private messageRepository: Repository<Message>,
                private chatRoomService: ChatRoomService) {
    }

    async createMessage(messageDto: CreateMessageDto): Promise<Message> {
        const message = await this.messageRepository.create(messageDto)
        const savedMessageToDB = await this.messageRepository.save(message)
        return savedMessageToDB
    }

    async getMessagesFromRoom(roomId: string): Promise<Message[]> {
        const chatRoom = await this.chatRoomService.getRoomById(roomId)
        const messages = await this.messageRepository.find()

        if (!chatRoom) {
            throw new UnauthorizedException("room was not found")
        }

        chatRoom.messages = messages
        return messages
    }


}