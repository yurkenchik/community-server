import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.model";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {AuthService} from "../auth/auth.service";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
      forwardRef(() => AuthModule),
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
          secret: process.env.JWT_SECRET_KEY,
          signOptions: {
              expiresIn: "24h"
          }
      }),
      AuthService
  ],
  exports: [
      UsersService
  ]

})

export class UsersModule {}
