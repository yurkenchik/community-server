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
    UseGuards,
    UsePipes,
    ValidationPipe
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
import {UpdateCommentDto} from "./dto/update-comment.dto";
import * as stream from "node:stream";

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
                            @Param("postId") postId: string)
    {
        try {
            const userId = request.user.id
            console.log(userId)
            console.log(postId)
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
                                @Param("userId") userId: string,
                                @Param("postId") postId: string)
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
                            @Param("postId") postId: string,
                            @Param("commentId") commentId: string)
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
    getOneCommentToSomeonesPost(@Param("userId") userId: string,
                                @Param("postId") postId: string,
                                @Param("commentId") commentId: string)
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
    getCommentsToYourPost(@Req() request, @Param("postId") postId: string) {
        try {
            const userId = request.user.id
            console.log(userId)
            console.log(postId)
            return this.commentsService.getAllComments(userId, postId)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Getting comments to someone`s post"})
    @ApiResponse({status: 200, type: [Comment]})
    @UseGuards(JwtAuthGuard)
    @Get("/get-comments/:userId/:postId")
    getCommentsToSomeonesPost(@Param("userId") userId: string, @Param("postId") postId: string) {
        try {
            return this.commentsService.getAllComments(userId, postId)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: 'Updating comment to your post'})
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(JwtAuthGuard)
    @Patch("/update-comment/:postId/:commentId")
    updateCommentToYourPost(@Req() request,
                            @Param("postId") postId: string,
                            @Param("commentId") commentId: string,
                            @Body() updateCommentDto: UpdateCommentDto) {
        try {
            const userId = request.user.id
            return this.commentsService.updateComment(userId, postId, commentId, updateCommentDto)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: 'Updating comment to your post'})
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(JwtAuthGuard)
    @Patch("/update-comment/:userId/:postId/:commentId")
    updateCommentToSomeonesPost(@Param("userId") userId: string,
                                @Param("postId") postId: string,
                                @Param("commentId") commentId: string,
                                @Body() updateCommentDto: UpdateCommentDto)
    {
        try {
            return this.commentsService.updateComment(userId, postId, commentId, updateCommentDto)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Deleting comment to your post"})
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(JwtAuthGuard)
    @Delete("/delete-comment/:postId/:commentId")
    deleteCommentToYourPost(@Req() request,
                            @Param("postId") postId: string,
                            @Param("commentId") commentId: string)
    {
        try {
            const userId = request.user.id
            return this.commentsService.deleteComment(userId, postId, commentId)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({summary: "Deleting comment to someone`s post"})
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(JwtAuthGuard)
    @Delete("/delete-comment/:userId/:postId")
    deleteCommentToSomeonesPost(@Param("userId") userId: string,
                                @Param("postId") postId: string,
                                @Param("commentId") commentId: string) {
        try {
            return this.commentsService.deleteComment(userId, postId, commentId)
        } catch (error) {
            throw new HttpException("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
