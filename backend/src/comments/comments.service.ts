import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {GetUserByIdDto} from "../users/dto/get-user-by-id.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {PostsService} from "../posts/posts.service";
import {FindPostByIdDto} from "../posts/dto/find-post-by-id.dto";
import {Comment} from "./comments.model";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {GetCommentByIdDto} from "./dto/get-comment-by-id.dto";


@Injectable()
export class CommentsService {

    constructor(@InjectRepository(Comment)
                private commentRepository: Repository<Comment>,
                private readonly userService: UsersService,
                private readonly postService: PostsService) {
    }

    // TODO: finish writing function with ids
    async getComment(userId: string, postId: string, commentId: string): Promise<Comment> {
        const post = await this.postService.getPostByIdWithUserId(userId, postId)
        const comment = await this.commentRepository.findOne({
            where: {id: commentId, post: post},
        })
        if (!comment) {
            throw new NotFoundException("Comment was not found")
        }

        return comment
    }

    private async getCommentById(commentId: GetCommentByIdDto) {
        const comment = await this.commentRepository.findOne({
            where: {id: commentId.commentId}
        })
    }

    async createCommentToPost(userId: string, postId: string, createCommentDto: CreateCommentDto): Promise<Comment> {
        const user = await this.userService.getUserById(userId)
        const post = await this.postService.getPostByIdWithUserId(userId, postId)

        console.log(user)
        console.log(post)

        if (!user || !post) {
            throw new NotFoundException("Post is not found")
        }

        const comment = this.commentRepository.create(createCommentDto)
        comment.post = post

        const savedComment = this.commentRepository.save(comment)
        return savedComment
    }

    async updateComment(userId: string,
                        postId: string,
                        commentId: string,
                        updateCommentDto: UpdateCommentDto)
    {

        const post = await this.postService.getPostByIdWithUserId(userId, postId)

        if (!post) {
            throw new NotFoundException("Post is not found")
        }

        const comment = await this.commentRepository.findOne({
            where: {id: commentId, post: post}
        })
        comment.content = updateCommentDto.content
        return comment

    }

    async deleteComment(userId: string, postId: string, commentId: string) {

        const comment = this.getComment(userId, postId, commentId)

        if (!comment) throw new NotFoundException("Comment was not found")

        const deletedComment = await this.commentRepository
            .createQueryBuilder()
            .delete()
            .from(Comment)
            .where("id = :id", {id: commentId})
            .execute()

        return deletedComment
    }

    async getAllComments(userId: string, postId: string): Promise<Comment[]> {
        const user = await this.userService.getUserById(userId)
        console.log(user)
        const post = await this.postService.getPostByIdWithUserId(userId, postId)
        if (!post) {
            throw new NotFoundException("Post was not found")
        }

        const comments = await this.commentRepository.find({
            where: {post: post}
        })
        console.log(`user id: ${userId}`)
        console.log(`post id: ${postId}`)
        console.log(comments)

        return comments
    }

    async getSomeonesComments() {

    }

}
