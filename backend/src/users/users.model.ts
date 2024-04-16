import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {Post} from "../posts/posts.model";
import {Message} from "../chat/models/message.model";
import {ConnectedUser} from "../chat/models/connected-user.model";
import {Chatroom} from "../chat/models/chatroom.model";
import {JoinedRoom} from "../chat/models/joined-room.model";


@Entity()
export class User {

    @ApiProperty({example: "1", description: "unique identification"})
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({example: "user078413", required: true, description: "username"})
    @Column({type: "varchar", nullable: false})
    username: string

    @ApiProperty({example: "user@gmail.com", required: true, description: "email address"})
    @Column({type: "varchar", unique: true, nullable: false})
    email: string

    @ApiProperty({example: "blueFlower", required: true, description: "password example"})
    @Column({type: "varchar", nullable: false})
    password: string

    @ApiProperty({example: "true", description: "banned or not"})
    @Column({type: "boolean", default: false})
    banned: boolean

    @ApiProperty({example: "for cheating", description: "ban reason"})
    @Column({type: "varchar", default: ""})
    banReason: string

    @ManyToMany(() => Role, { cascade: true })
    @JoinTable()
    roles: Role[]

    @OneToMany(() => Post, post => post.author)
    @JoinTable()
    posts: Role[]

    @OneToMany(() => Message, message => message.user)
    messages: Message[]

    @ManyToMany(() => Chatroom, chatroom => chatroom.users)
    chatRooms: Chatroom[]

    @OneToMany(() => ConnectedUser, connection => connection.user)
    connections: ConnectedUser[]

    @OneToMany(() => JoinedRoom, joinedRoom => joinedRoom.user)
    joinedRooms: JoinedRoom[]
}