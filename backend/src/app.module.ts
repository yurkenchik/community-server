import {DynamicModule, MiddlewareConsumer, Module, NestModule} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./users/users.model";
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import {UsersService} from "./users/users.service";
import {UsersController} from "./users/users.controller";
import {AuthController} from "./auth/auth.controller";
import { ChatModule } from './chat/chat.module';
import {PostsService} from "./posts/posts.service";
import {PostsController} from "./posts/posts.controller";
import {RolesService} from "./roles/roles.service";
import {RolesController} from "./roles/roles.controller";
import {TokenService} from "./token/token.service";
import { CommentsModule } from './comments/comments.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import dbConfig from "./db.config";
import {dataSourceOptions} from "./database/data-source";
import {JwtMiddleware} from "./middlewares/jwt.middleware";
import {JwtWebsocketsMiddleware} from "./middlewares/jwt-websockets.middleware";

export function DatabaseOrmModule(): DynamicModule {
    return TypeOrmModule.forRoot(dbConfig)
}

@Module({
    controllers: [UsersController, AuthController, PostsController, RolesController],
    providers: [UsersService, AuthService, PostsService, RolesService, TokenService, EmailService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRoot(dataSourceOptions),
        UsersModule,
        AuthModule,
        ChatModule,
        CommentsModule,
        EmailModule,
    ],
})
export class AppModule implements NestModule {
        configure(consumer: MiddlewareConsumer): any {
            consumer.apply(JwtMiddleware).forRoutes("posts/*", "comments/*")
            consumer.apply(JwtWebsocketsMiddleware).forRoutes("/chat/*")
        }
}