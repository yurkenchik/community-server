import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {CreatePostDto} from "../posts/dto/create-post.dto";
import {FindPostByIdDto} from "../posts/dto/find-post-by-id.dto";
import {CommentsService} from "./comments.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Comment} from "./comments.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GetUserByIdDto} from "../users/dto/get-user-by-id.dto";
import {GetCommentByIdDto} from "./dto/get-comment-by-id.dto";
import {JwtService} from "@nestjs/jwt";
import {CreateCommentDto} from "./dto/create-comment.dto";

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService,
                private readonly jwtService: JwtService) {
    }

    @ApiOperation({summary: "Creating a comment to your post"})
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post("/create-comment/:postId")
    createCommentToYourPost(@Body() commentBody: CreateCommentDto,
                            @Req() request,
                            @Param("postId") postId: FindPostByIdDto)
    {
        try {
            const userId = request.user.id
            console.log(userId)
            return this.commentsService.createCommentToPost(userId, postId, commentBody)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Creating a comment someone`s post"})
    @ApiResponse({status: 201, type: Comment})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post("/create-comment/:userId/:postId")
    createCommentToSomeonesPost(@Body() postBody: CreatePostDto,
                                @Param("userId") userId: GetUserByIdDto,
                                @Param("postId") postId: FindPostByIdDto)
    {
        try {
            return this.commentsService.createCommentToPost(userId, postId, postBody)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting comment to your post"})
    @ApiResponse({status: 200, type: Comment})
    @Get("/get-comment/:postId/:commentId")
    getOneCommentToYourPost(@Req() request,
                            @Param("postId") postId: FindPostByIdDto,
                            @Param("commentId") commentId: GetCommentByIdDto)
    {
        try {
            const userId = request.user.id
            return this.commentsService.getComment(userId, postId, commentId)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting comment to someone`s post"})
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(JwtAuthGuard)
    @Get("/get-comment/:userId/:postId/:commentId")
    getOneCommentToSomeonesPost(@Param("userId") userId: GetUserByIdDto,
                                @Param("postId") postId: FindPostByIdDto,
                                @Param("commentId") commentId: GetCommentByIdDto)
    {
        try {
            return this.commentsService.getComment(userId, postId, commentId)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting comments to your post"})
    @ApiResponse({status: 200, type: [Comment]})
    @UseGuards(JwtAuthGuard)
    @Get("/get-comments/:postId")
    getCommentsToYourPost(@Req() request, @Param("postId") postId: FindPostByIdDto) {
        try {
            const userId = request.user.id
            return this.commentsService.getAllYourComments(userId, postId)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting comments to someone`s post"})
    @ApiResponse({status: 200, type: [Comment]})
    @UseGuards(JwtAuthGuard)
    @Get("/get-comments/:userId/:postId")
    getCommentsToSomeonesPost(@Param("userId") userId: GetUserByIdDto, @Param("postId") postId: FindPostByIdDto) {
        try {
            return this.commentsService.getAllYourComments(userId, postId)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Patch("/update-comment")
    updateCommentToSomeonesPost() {
        try {

        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete("/delete-comment/:postId/:commentId")
    deleteCommentToYourPost(@Req() request,
                            @Param("postId") postId: FindPostByIdDto,
                            @Param("commentId") commentId: GetCommentByIdDto)
    {
        try {
            const userId = request.user.id
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete("/delete-comment/:userId/:postId")
    deleteCommentToSomeonesPost() {
        try {

        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
