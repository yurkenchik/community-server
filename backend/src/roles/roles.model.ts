import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";


@Entity()
export class Role {

    @ApiProperty({example: '43902df-4314-das431-dsa314', description: 'roles id'})
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({example: "ADMIN", description: "administrator"})
    @Column({type: "varchar", unique: true, nullable: false})
    value: string

    @ApiProperty({example: "ADMIN", description: "administrator"})
    @Column({type: "varchar", unique: true, nullable: false})
    description: string

    @ManyToMany(() => User, user => user.roles)
    @JoinTable()
    users: User[]

}