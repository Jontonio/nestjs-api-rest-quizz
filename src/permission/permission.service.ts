import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./entities/permission.entity";
import { Repository } from "typeorm";
import { HttpResponse } from "src/class/HttpResponse";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/page.dto";
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) public permissionModel: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const permission = await this.permissionModel.save(createPermissionDto);
      return new HttpResponse().success(
        201,
        "permiso creado correctamente",
        permission,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al crear el permiso",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const { skip, order, take } = pageOptionsDto;
      const permission = await this.permissionModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { id_permission: order },
      });
      const itemCount = await this.permissionModel.countBy({
        status: true,
      });
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      const data = new PageDto(permission, pageMetaDto);
      return new HttpResponse().success(
        201,
        "Lista de permisos",
        data,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener los permisos",
      );
    }
  }

  async findOne(id: number) {
    try {
      const permission = await this.permissionModel.findBy({
        id_permission: id,
      });

      return new HttpResponse().success(201, "permiso", permission);
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener el permiso",
      );
    }
  }

  async update(id_permission: number, data: UpdatePermissionDto) {
    try {
      const permission = await this.permissionModel.update(id_permission, data);

      return new HttpResponse().success(
        201,
        "permiso actualizado correctamente",
        permission,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar el permiso",
      );
    }
  }

  async remove(id_permission: number) {
    try {
      const permission = await this.permissionModel.update(id_permission, {
        status: false,
      });

      return new HttpResponse().success(
        201,
        "permiso eliminado correctamente",
        permission,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar el permission",
      );
    }
  }
}
