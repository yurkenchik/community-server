import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.model";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {TokenModule} from "../token/token.module";
import {Role} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {UserRoles} from "../roles/user_roles.model";
import {PostsModule} from "../posts/posts.module";
import {Post} from "../posts/posts.model";
import {CommentsModule} from "../comments/comments.module";


@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
      forwardRef(() => TokenModule),
      forwardRef(() => AuthModule),
      forwardRef(() => PostsModule),
      forwardRef(() => CommentsModule),
      RolesModule,
      TypeOrmModule.forFeature([User, Role, UserRoles, Post]),
      JwtModule.register({
          secret: process.env.JWT_SECRET_KEY,
          signOptions: {
              expiresIn: "24h"
          }
      })
  ],
  exports: [
      UsersService,
      TypeOrmModule
  ]
})

export class UsersModule {}
