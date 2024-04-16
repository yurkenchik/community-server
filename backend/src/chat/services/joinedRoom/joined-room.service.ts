import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {JoinedRoom} from "../../models/joined-room.model";
import {Repository} from "typeorm";

@Injectable()
export class JoinedRoomService {
    
    constructor(@InjectRepository(JoinedRoom)
                private joinedRoomRepository: Repository<JoinedRoom> ) {}

    async create() {}
    
}