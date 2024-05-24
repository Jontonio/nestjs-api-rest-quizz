import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateRolePermissionDto } from "./dto/create-role_permission.dto";
import { UpdateRolePermissionDto } from "./dto/update-role_permission.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { RolePermission } from "./entities/role_permission.entity";
import { Repository } from "typeorm";
import { HttpResponse } from "src/class/HttpResponse";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/page.dto";

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    public rolePermissionModel: Repository<RolePermission>,
  ) {}
  async create(createRolePermissionDto: CreateRolePermissionDto) {
    try {
      const rolePermission = await this.rolePermissionModel.save(
        createRolePermissionDto,
      );

      return new HttpResponse().success(
        201,
        "rol permiso creado correctamente",
        rolePermission,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al crear la rol permiso",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const { skip, order, take } = pageOptionsDto;
      const rolePermission = await this.rolePermissionModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { id_role_permission: order },
      });

      const itemCount = await this.rolePermissionModel.count({
        where: { status: true },
      });

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      const data = new PageDto(rolePermission, pageMetaDto);

      return new HttpResponse().success(
        201,
        "Lista de role permiso",
        data,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener lista de rol permiso",
      );
    }
  }

  async findOne(id_role_permission: number) {
    try {
      const rolePermission = await this.rolePermissionModel.findOne({
        where: { id_role_permission, status: true },
        relations: ["role", "permission"],
      });
      return new HttpResponse().success(
        200,
        "Obtención de una rol permiso",
        rolePermission,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener el rol permiso",
      );
    }
  }

  async update(id_role_permission: number, updateRolePermissionDto: UpdateRolePermissionDto) {
    try {
      const rolePermission = await this.rolePermissionModel.update(
        id_role_permission,
        updateRolePermissionDto,
      );

      return new HttpResponse().success(
        201,
        "rol permiso actualizado correctamente",
        rolePermission,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar role permiso",
      );
    }
  }

  async remove(id_role_permission: number) {
    try {
      const rolePermission = await this.rolePermissionModel.update(
        id_role_permission,
        {
          status: false,
        },
      );

      return new HttpResponse().success(
        201,
        "Rol permiso eliminado correctamente",
        rolePermission,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar rol permiso ",
      );
    }
  }
}

