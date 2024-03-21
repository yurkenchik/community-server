import {forwardRef, Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import {PostsController} from "./posts.controller";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {Types} from "mysql2";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Post} from "./posts.model";

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [
        forwardRef(() => JwtModule),
        forwardRef(() => UsersModule),
        TypeOrmModule.forFeature([User, Post])
    ],
    exports: [
        PostsService
    ]
})
export class PostsModule {}
