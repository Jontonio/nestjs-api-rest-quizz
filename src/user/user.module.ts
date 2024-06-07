import { Module, RequestMethod } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { RolePermission } from "src/role_permission/entities/role_permission.entity";
import { MiddlewareBuilder } from "@nestjs/core";
import { ExistUserMiddleware } from "src/middlewares/user/exist-user.middleware";
import {
  UniqueEmailUserValidator,
  UniqueIdCardUserValidator,
} from "src/decorators/User";
import { Role } from "src/role/entities/role.entity";
import { ExistRoleValidator } from "src/decorators/Role";

@Module({
  imports: [TypeOrmModule.forFeature([User, RolePermission, Role])],
  controllers: [UserController],
  providers: [
    UserService,
    UniqueEmailUserValidator,
    UniqueIdCardUserValidator,
    ExistRoleValidator,
  ],
})
export class UserModule {
  configure(consumer: MiddlewareBuilder) {
    consumer
      .apply(ExistUserMiddleware)
      .forRoutes({ path: "user/:id", method: RequestMethod.GET });
  }
}
