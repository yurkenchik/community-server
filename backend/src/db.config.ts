import {User} from "./users/users.model";
import {Role} from "./roles/roles.model";
import {Post} from "./posts/posts.model";
import {Comment} from "./comments/comments.model";
import {config} from "dotenv";
import * as process from "node:process";
import {ConnectionOptions} from "typeorm";
import {Message} from "./chat/models/message.model";
import {JoinedRoom} from "./chat/models/joined-room.model";
import {Chatroom} from "./chat/models/chatroom.model";
import {ConnectedUser} from "./chat/models/connected-user.model";
config()

const DB_CONNECTION: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Role, Post, Comment, Message, JoinedRoom, Chatroom, ConnectedUser],
    synchronize: Boolean(process.env.TYPEORM_MIGRATIONS_SYNCHRONIZE),
    migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN),
    logging: Boolean(process.env.LOGGING),
    migrations: [__dirname + process.env.TYPEORM_MIGRATIONS],
    migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME
}

export default DB_CONNECTION

