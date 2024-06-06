import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { HttpResponse } from "src/class/HttpResponse";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/page.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public userModel: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.save(
        createUserDto,
      );

      return new HttpResponse().success(
        201,
        "usuariocreado correctamente",
        user,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al crear la usuario",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const { skip, order, take } = pageOptionsDto;
      const user = await this.userModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { id_user: order },
      });

      const itemCount = await this.userModel.count({
        where: { status: true },
      });

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      const data = new PageDto(user, pageMetaDto);

      return new HttpResponse().success(
        201,
        "Lista de usuarios",
        data,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener lista de ususarios",
      );
    }
  }

  async findOne(id_user: number) {
    try {
      const user = await this.userModel.findOne({
        where: { id_user, status: true },
        relations: ["user"],
      });
      return new HttpResponse().success(
        200,
        "Obtención de una usuario ",
        user,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener el ususario",
      );
    }
  }

  async update(id_user: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.update(
        id_user,
        updateUserDto,
      );

      return new HttpResponse().success(
        201,
        "Ususario actualizado correctamente",
        user,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar role permiso",
      );
    }
  }

  async remove(id_user: number) {
    try {
      const user = await this.userModel.update(
        id_user,
        {
          status: false,
        },
      );

      return new HttpResponse().success(
        201,
        "usuario eliminado correctamente",
        user,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar ususario ",
      );
    }
  }
}
