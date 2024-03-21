import {forwardRef, Module} from '@nestjs/common';
import { RolesService } from './roles.service';
import {RolesController} from "./roles.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Role} from "./roles.model";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import {UserRoles} from "./user_roles.model";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
      TypeOrmModule.forFeature([Role, User, UserRoles]),
      forwardRef(() => UsersModule),
      forwardRef(() => AuthModule),
  ],
    exports: [
        RolesService,
        TypeOrmModule
    ]
})
export class RolesModule {}
