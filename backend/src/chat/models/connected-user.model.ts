import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/users.model";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class ConnectedUser {

    @ApiProperty({example: "432pd4-23dase-4eds-423d", description: "connected user id"})
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({example: "MDaspoXasdpa03d", description: "socket-user id"})
    @Column()
    SocketId: string

    @ManyToOne(() => User, user => user.connections)
    @JoinColumn()
    user: User

}