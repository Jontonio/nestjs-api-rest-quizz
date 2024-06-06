import { Module } from "@nestjs/common";
import { RolePermissionService } from "./role_permission.service";
import { RolePermissionController } from "./role_permission.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolePermission } from "./entities/role_permission.entity";
import { Role } from "src/role/entities/role.entity";
import { Permission } from "src/permission/entities/permission.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission, Role, Permission])],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
})
export class RolePermissionModule {}
