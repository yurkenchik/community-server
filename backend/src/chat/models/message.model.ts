import {
    Column,
    CreateDateColumn, Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../users/users.model";
import {Chatroom} from "./chatroom.model";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Message {

    @ApiProperty({example: "43d3esf-4fset-3534fgd-f4324", description: "message id"})
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({example: "hi, how are you?", description: "message content"})
    @Column({type: "varchar", nullable: false})
    content: string

    @ManyToOne(() => User, user => user.messages)
    @JoinColumn()
    user: User

    @ManyToOne(() => Chatroom, chatroom => chatroom.messages)
    chatroom: Chatroom

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt: Date

}