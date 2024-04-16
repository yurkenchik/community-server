import {
    Column,
    CreateDateColumn, Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../users/users.model";
import {Message} from "./message.model";
import {JoinedRoom} from "./joined-room.model";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Chatroom {

    @ApiProperty({example: "4324o-423ds-4132d-d34", description: "chatroom id"})
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({example: "My little pony", description: "chat room name"})
    @Column({type: "varchar"})
    name: string

    @ApiProperty({example: "This group is only for elite from IR-12", description: "group description"})
    @Column({type: "varchar", nullable: true})
    description: string

    @ManyToMany(() => User, user => user.chatRooms)
    @JoinTable()
    users: User[]

    @OneToMany(() => Message, message => message.chatroom)
    messages: Message[]

    @OneToMany(() => JoinedRoom, joinedRoom => joinedRoom.chatroom)
    joinedUsers: JoinedRoom[]

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt: Date

}