import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role } from "./entities/role.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpResponse } from "src/class/HttpResponse";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/page.dto";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) public roleModel: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleModel.save(createRoleDto);
      return new HttpResponse().success(
        201,
        "rol creado correctamente",
        role,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al crear el rol",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const { skip, order, take } = pageOptionsDto;
      const role = await this.roleModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { id_role: order },
      });
      const itemCount = await this.roleModel.countBy({
        status: true,
      });
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      const data = new PageDto(role, pageMetaDto);
      return new HttpResponse().success(
        201,
        "Lista de roles",
        data,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener los roles",
      );
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleModel.findBy({
        id_role: id,
      });

      return new HttpResponse().success(201, "rol", role);
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener el rol",
      );
    }
  }

  async update(id_role: number, data: UpdateRoleDto) {
    try {
      const permission = await this.roleModel.update(id_role, data);

      return new HttpResponse().success(
        201,
        "rol actualizado correctamente",
        permission,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar el rol",
      );
    }
  }

  async remove(id_role: number) {
    try {
      const role = await this.roleModel.update(id_role, {
        status: false,
      });

      return new HttpResponse().success(
        201,
        "rol eliminado correctamente",
        role,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar el rol",
      );
    }
  }
}
