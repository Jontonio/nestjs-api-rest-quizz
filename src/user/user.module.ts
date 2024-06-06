import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { RolePermission } from "src/role_permission/entities/role_permission.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, RolePermission])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
