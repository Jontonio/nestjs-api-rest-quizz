import { HttpException, Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role } from "./entities/role.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpResponse } from "src/class/HttpResponse";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/Page.dto";

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) public roleModel: Repository<Role>) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleModel.save(createRoleDto);
      return new HttpResponse().success(201, "rol creado correctamente", role);
    } catch (e) {
      throw new HttpException(e.message, e.status);
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
      return new HttpResponse().success(201, "Lista de roles", data);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async findOne(id_role: number) {
    try {
      const role = await this.roleModel.findOneBy({
        id_role,
      });

      return new HttpResponse().success(201, "Obtener rol", role);
    } catch (e) {
      throw new HttpException(e.message, e.status);
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
    } catch (e) {
      throw new HttpException(e.message, e.status);
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
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
