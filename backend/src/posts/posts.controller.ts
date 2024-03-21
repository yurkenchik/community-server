import {PostsService} from "./posts.service";
import {Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {FindPostByIdDto} from "./dto/find-post-by-id.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({summary: "Post creation"})
    @ApiResponse({status: 200, type: Post})
    @UseGuards(JwtAuthGuard)
    @Post("/create-post")
    createPost(dto: CreatePostDto) {
        try {
            return this.postService.createPost(dto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    @ApiOperation({summary: "Post updating"})
    @ApiResponse({status: 200, type: Post})
    @UseGuards(JwtAuthGuard)
    @Patch("/update-post/:id")
    updatePost(@Param("id") id: FindPostByIdDto, dto: UpdatePostDto) {
        try {
            return this.postService.updatePost(id, dto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting all posts"})
    @ApiResponse({status: 200, type: [Post]})
    @UseGuards(JwtAuthGuard)
    @Get("/get-posts")
    getAllPosts() {
        try {
            return this.postService.getAllPosts()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting post by id"})
    @ApiResponse({status: 200, type: Post})
    @UseGuards(JwtAuthGuard)
    getOnePost(@Param("id") id: FindPostByIdDto) {
        try {
            return this.postService.getPost(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Deleting post by id"})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Delete("/delete-post/:id")
    deletePost(@Param("id") id: FindPostByIdDto) {
        try {
            return this.postService.deletePost(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
