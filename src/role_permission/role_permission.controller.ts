import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { RolePermissionService } from "./role_permission.service";
import { CreateRolePermissionDto } from "./dto/create-role_permission.dto";
import { UpdateRolePermissionDto } from "./dto/update-role_permission.dto";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";

@Controller("role-permission")
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Post()
  create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this.rolePermissionService.create(createRolePermissionDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.rolePermissionService.findAll(pageOptionsDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rolePermissionService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRolePermissionDto: UpdateRolePermissionDto,
  ) {
    return this.rolePermissionService.update(+id, updateRolePermissionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolePermissionService.remove(+id);
  }
}
