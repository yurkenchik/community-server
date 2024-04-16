import {forwardRef, Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import {PostsController} from "./posts.controller";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Post} from "./posts.model";
import {AuthModule} from "../auth/auth.module";
import {CommentsModule} from "../comments/comments.module";

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [
        forwardRef(() => JwtModule),
        forwardRef(() => UsersModule),
        forwardRef(() => AuthModule),
        forwardRef(() => CommentsModule),
        TypeOrmModule.forFeature([User, Post])
    ],
    exports: [
        PostsService
    ]
})
export class PostsModule {}
