import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {TokenModule} from "../token/token.module";
import {RolesModule} from "../roles/roles.module";
import {EmailModule} from "../email/email.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(() => UsersModule),
      forwardRef(() => TokenModule),
      forwardRef(() => RolesModule),
      forwardRef(() => EmailModule),
      JwtModule.register({
          secret: process.env.JWT_SECRET_KEY || "secret",
          signOptions: {
              expiresIn: "168h"
          }
      })
  ],
  exports: [
      AuthService,
      JwtModule,
  ]
})

export class AuthModule {}
