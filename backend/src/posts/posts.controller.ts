import {PostsService} from "./posts.service";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post, Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {FindPostByIdDto} from "./dto/find-post-by-id.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {GetUserByIdDto} from "../users/dto/get-user-by-id.dto";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({summary: "Post creation"})
    @ApiResponse({status: 200, type: Post})
    @UsePipes(ValidationPipe)
    @UseGuards()
    @UseGuards(JwtAuthGuard)
    @Post("/create-post")
    createPost(@Req() request, @Body() dto: CreatePostDto) {
        try {
            const userId = request.user
            return this.postService.createPost(userId, dto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Post updating"})
    @ApiResponse({status: 200, type: Post})
    @UseGuards(JwtAuthGuard)
    @Patch("/update-post/:id")
    updatePost(@Req() request, @Param("id") postId: FindPostByIdDto, @Body() dto: UpdatePostDto) {
        try {
            const userId = request.user
            return this.postService.updatePost(userId, postId, dto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting all posts"})
    @ApiResponse({status: 200, type: [Post]})
    @UseGuards(JwtAuthGuard)
    @Get("/get-posts")
    getAllPosts(@Req() request) {
        try {
            const userId = request.user.id
            return this.postService.getAllPosts(userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting post by id"})
    @ApiResponse({status: 200, type: Post})
    @UseGuards(JwtAuthGuard)
    @Get("/get-post/:id")
    getOnePost(@Req() request, @Param("id") postId: FindPostByIdDto) {
        try {
            const userId = request.user
            return this.postService.getPost(userId,postId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Deleting post by id"})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Delete("/delete-post/:id")
    deletePost(@Req() request, @Param("id") postId: FindPostByIdDto) {
        try {
            const userId = request.user
            return this.postService.deletePost(userId, postId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
