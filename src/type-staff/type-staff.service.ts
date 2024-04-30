import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateTypeStaffDto } from "./dto/create-type-staff.dto";
import { UpdateTypeStaffDto } from "./dto/update-type-staff.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeStaff } from "./entities/type-staff.entity";
import { Repository } from "typeorm";
import { HttpResponse } from "src/class/HttpResponse";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/page.dto";

@Injectable()
export class TypeStaffService {
  constructor(
    @InjectRepository(TypeStaff) public typeStaffModel: Repository<TypeStaff>,
  ) {}

  async create(createTypeStaffDto: CreateTypeStaffDto) {
    try {
      const typeStaff = await this.typeStaffModel.save(createTypeStaffDto);
      return new HttpResponse().success(
        201,
        "Nombre de tipo de personal creado correctamente",
        typeStaff,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al crear el personal",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      // Desestructurar el objeto pageOptionsDto
      const { skip, order, take } = pageOptionsDto;
      // Lista los tipos de staffs
      const typeStaffs = await this.typeStaffModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { id_type_staff: order },
      });
      // Contar la cantidad de registros
      const itemCount = await this.typeStaffModel.countBy({
        status: true,
      });
      // Instanciar el objeto para page meta
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      // Instanciar page dto con la data y page meta
      const data = new PageDto(typeStaffs, pageMetaDto);
      // Retornar la respuesta
      return new HttpResponse().success(
        201,
        "Lista de tipos de personal",
        data,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener los tipos de personal",
      );
    }
  }

  async findOne(id: number) {
    try {
      const typeStaff = await this.typeStaffModel.findBy({
        id_type_staff: id,
      });

      return new HttpResponse().success(201, "Tipo personal", typeStaff);
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener el personal",
      );
    }
  }

  async update(id_type_staff: number, data: UpdateTypeStaffDto) {
    try {
      const typeStaff = await this.typeStaffModel.update(id_type_staff, data);

      return new HttpResponse().success(
        201,
        "Tipo de personal actualizado correctamente",
        typeStaff,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar el personal",
      );
    }
  }

  async remove(id_type_staff: number) {
    try {
      const typeStaff = await this.typeStaffModel.update(id_type_staff, {
        status: false,
      });

      return new HttpResponse().success(
        201,
        "Tipo de personal eliminado correctamente",
        typeStaff,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar el personal",
      );
    }
  }
}
