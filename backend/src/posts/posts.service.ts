import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Post} from "./posts.model";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {FindPostByIdDto} from "./dto/find-post-by-id.dto";

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post)
                private postRepository: Repository<Post>) {
    }

    async getAllPosts() {
        const posts = await this.postRepository.find()
        if (!posts) {
            throw new HttpException("Posts are not found", HttpStatus.NOT_FOUND)
        }
        return posts
    }

    async getPost(dto: FindPostByIdDto) {
        const post = await this.postRepository.findOne({where: {id: dto.id}})

        if (!post) {
            throw new HttpException("Post is not found", HttpStatus.NOT_FOUND)
        }

        return post
    }

    async createPost(dto: CreatePostDto) {
        const post = await this.postRepository.create(dto)
        if (!post) {
            throw new HttpException("Post is not found", HttpStatus.NOT_FOUND)
        }
        const savedPostToDB = await this.postRepository.save(post)

        return savedPostToDB
    }

    private async findPostBtId(dto: FindPostByIdDto) {
        const post = await this.postRepository.findOne({where: {id: dto.id}})
        return post
    }

    async updatePost(id: FindPostByIdDto, dto: UpdatePostDto) {
        const post = await this.findPostBtId(id)

        if (!post) {
            throw new HttpException("Post is not found", HttpStatus.NOT_FOUND)
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

    async deletePost(dto: FindPostByIdDto) {

        const post = await this.postRepository.findOne({where: {id: dto.id}})

        if (post) {
            const deletedPost = await this.postRepository.delete(post)
            return deletedPost
        }

        throw new HttpException("Post was not found", HttpStatus.NOT_FOUND)
    }


}
