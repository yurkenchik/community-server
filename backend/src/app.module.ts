import {Module} from "@nestjs/common"
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


@Module({
    controllers: [UsersController, AuthController],
    providers: [UsersService, AuthService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User],
            synchronize: true,
            autoLoadEntities: true
        }),
        UsersModule,
        AuthModule,
    ],
})
export class AppModule {

}