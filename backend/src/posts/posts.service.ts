import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Post} from "./posts.model";
import {DeleteResult, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {FindPostByIdDto} from "./dto/find-post-by-id.dto";
import {UsersService} from "../users/users.service";
import {GetUserByIdDto} from "../users/dto/get-user-by-id.dto";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class PostsService {

    NOT_FOUND_USER = "User with this ID is not found"
    NOT_FOUND_POST = "Post with this ID is not found"

    constructor(@InjectRepository(Post)
                private postRepository: Repository<Post>,
                private userService: UsersService,
                private authService: AuthService) {
    }

    async getAllPosts(userId: GetUserByIdDto): Promise<Post[]> {
        const user = await this.userService.getUserById(userId)
        if (!user) {
            throw new NotFoundException(this.NOT_FOUND_USER)
        }
        const posts = await this.postRepository.find()
        if (!posts) {
            throw new HttpException("Posts are not found", HttpStatus.NOT_FOUND)
        }
        return posts
    }

    async getPost(userId: GetUserByIdDto, dto: FindPostByIdDto): Promise<Post> {
        const user = await this.userService.getUserById(userId)
        const post = await this.postRepository.findOne({where: {id: dto.id}})
        if (!user) {
            throw new NotFoundException(this.NOT_FOUND_USER)
        }

        if (!post) {
            throw new NotFoundException(this.NOT_FOUND_POST)
        }

        return post
    }

    async createPost(userId: GetUserByIdDto, postDto: CreatePostDto): Promise<Post> {

        const user = await this.userService.getUserById(userId)
        const post = await this.postRepository.create(postDto)

        if (!user) {
            throw new HttpException(this.NOT_FOUND_USER, HttpStatus.NOT_FOUND)
        }

        post.author = user

        const savedPostToDB = await this.postRepository.save(post)

        return savedPostToDB
    }

    private async findPostBtId(dto: FindPostByIdDto): Promise<Post> {
        const post = await this.postRepository.findOne({where: {id: dto.id}})
        return post
    }

    async updatePost(userId: GetUserByIdDto, postId: FindPostByIdDto, dto: UpdatePostDto): Promise<Post> {
        const post = await this.findPostBtId(postId)

        if (!post) {
            throw new HttpException(this.NOT_FOUND_POST, HttpStatus.NOT_FOUND)
        }

        if (post.title) {
            post.title = dto.title
        }

        if (post.content) {
            post.content = dto.content
        }

        const updatedPost = await this.postRepository.save(post)
        return updatedPost
    }

    private async getPostById(postId: FindPostByIdDto): Promise<Post> {
        const post = await this.postRepository.findOne({where: {id: postId.id}})

        if (!post) {
            throw new NotFoundException(this.NOT_FOUND_POST)
        }

        return post
    }

    async deletePost(userId: GetUserByIdDto, postId: FindPostByIdDto): Promise<DeleteResult> {

        const user = await this.userService.getUserById(userId)
        const post = await this.getPostById(postId)

        if (!user) {
            throw new NotFoundException(this.NOT_FOUND_USER)
        }

        if (post) {
            const deletedPost = await this.postRepository.delete(post)
            console.log(typeof deletedPost)
            return deletedPost
        }

        throw new HttpException(this.NOT_FOUND_POST, HttpStatus.NOT_FOUND)
    }

}
