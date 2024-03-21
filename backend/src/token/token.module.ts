import {forwardRef, Module} from '@nestjs/common';
import { TokenController } from './token.controller';
import {TokenService} from "./token.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [
      forwardRef(() => UsersModule),
      forwardRef(() => AuthModule),
  ],
  exports: [
      TokenService,
  ]
})
export class TokenModule {}
