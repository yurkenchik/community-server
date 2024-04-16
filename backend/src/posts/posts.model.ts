import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToOne, OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../users/users.model";
import {ApiProperty} from "@nestjs/swagger";
import {Comment} from "../comments/comments.model";

@Entity()
export class Post {

    @ApiProperty({example: "rqe43-dw4323-da34234-343s", description: "id"})
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty({example: "Work requirements", description: "topic name"})
    @Column({type: "varchar", nullable: false})
    title: string

    @ApiProperty({example: "Hi, today I want to share with you...", description: "post content"})
    @Column({type: "varchar", nullable: false})
    content: string

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt: Date

    @ApiProperty({example: "asdaikoskop23edsad243234.png", description: "image link"})
    @Column({type: "varchar"})
    image: string

    @ManyToOne(() => User, user => user.posts, { nullable: false })
    author: User

    @OneToMany(() => Comment, comment => comment.post)
    @JoinTable()
    comments: Comment[]

}