import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Param} from "@nestjs/common";
import {ApiProperty} from "@nestjs/swagger";
import {Post} from "../posts/posts.model";

@Entity()
export class Comment {

    @ApiProperty({example: "das24-das2-das4-da23ed", description: "comment id"})
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({example: "why did you do this way?", description: "comment to post"})
    @Column({ type: "varchar", nullable: false })
    content: string

    @ManyToOne(() => Post, post => post.comments)
    post: Post

}