import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(() => UsersModule),
      JwtModule.register({
          secret: process.env.JWT_SECRET_KEY || "secret",
          signOptions: {
              expiresIn: "24h"
          }
      }),
      UsersService
  ],
  exports: [
      AuthService,
      JwtModule
  ]
})

export class AuthModule {}
