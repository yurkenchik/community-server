import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Chatroom} from "../../models/chatroom.model";
import {Repository} from "typeorm";
import {CreateRoomDto} from "../../dto/create-room.dto";


@Injectable()
export class ChatRoomService {

    constructor(@InjectRepository(Chatroom)
                private chatRoomRepository: Repository<Chatroom>) {}

    async createRoom(createRoomDto: CreateRoomDto) {
        const room = await this.chatRoomRepository.create(createRoomDto)
        const savedRoom = await this.chatRoomRepository.save(room)
        return savedRoom
    }

    async getRoomById(chatRoomId: string): Promise<Chatroom> {
        const chatRoom = await this.chatRoomRepository.findOne({
            where: {id: chatRoomId},
            relations: ["users"]
        })
        return chatRoom
    }

    async deleteChatRoom(chatRoomId: string) {
        const deletedChatRoom = await this.chatRoomRepository
            .createQueryBuilder()
            .delete()
            .execute()
        return deletedChatRoom
    }

}