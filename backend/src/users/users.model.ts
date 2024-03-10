import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


interface UserCreationAttrs {
    email: string,
    password: string
}

@Entity()
export class User implements UserCreationAttrs {

    @ApiProperty({example: "1", description: "unique identification"})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: "user078413", description: "username"})
    @Column({type: "varchar", nullable: false})
    username: string

    @ApiProperty({example: "user@gmail.com", description: "email address"})
    @Column({type: "varchar", unique: true, nullable: false})
    email: string

    @ApiProperty({example: "blueFlower", description: "password example"})
    @Column({type: "varchar", nullable: false})
    password: string

    @ApiProperty({example: "true", description: "banned or not"})
    @Column({type: "boolean", default: false})
    banned: boolean

    @ApiProperty({example: "for cheating", description: "ban reason"})
    @Column({type: "varchar", default: ""})
    banReason: string
}