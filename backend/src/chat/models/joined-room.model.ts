import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/users.model";
import {Chatroom} from "./chatroom.model";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class JoinedRoom {

    @ApiProperty({example: "3rsed-3d3fsd-5rfd-543f45", description: "joined room id"})
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({example: "MK0d0scxc-DFAS", description: "joined room socket id"})
    @Column()
    SocketId: string

    @ManyToOne(() => User, user => user.joinedRooms)
    @JoinColumn()
    user: User

    @ManyToOne(() => Chatroom, chatroom => chatroom.joinedUsers)
    @JoinColumn()
    chatroom: Chatroom

}