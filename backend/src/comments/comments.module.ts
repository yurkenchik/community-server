import {forwardRef, Module} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {UsersModule} from "../users/users.module";
import {PostsModule} from "../posts/posts.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Post} from "../posts/posts.model";
import {Comment} from "./comments.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
      forwardRef(() => UsersModule),
      forwardRef(() => PostsModule),
      forwardRef(() => JwtModule),
      TypeOrmModule.forFeature([Comment])
  ],
  exports: [
      CommentsService
  ]
})

export class CommentsModule {}
