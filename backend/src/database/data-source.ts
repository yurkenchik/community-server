import {DataSource, DataSourceOptions} from "typeorm";
import {User} from "../users/users.model";
import {Role} from "../roles/roles.model";
import {Post} from "../posts/posts.model";
import {Comment} from "../comments/comments.model";
import * as process from "node:process";
import {Message} from "../chat/models/message.model";
import {JoinedRoom} from "../chat/models/joined-room.model";
import {ConnectedUser} from "../chat/models/connected-user.model";
import {Chatroom} from "../chat/models/chatroom.model";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Role, Post, Comment, Message, JoinedRoom, Chatroom, ConnectedUser],
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
    migrations: [process.env.TYPEORM_MIGRATIONS]
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource