import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ConnectedUser} from "../../models/connected-user.model";
import {Repository} from "typeorm";


@Injectable()
export class ConnectedUserService {

    constructor(@InjectRepository(ConnectedUser)
                private connectedUserRepository: Repository<ConnectedUser>) {}

}