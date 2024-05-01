import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateInstitutionStaffDto } from "./dto/create-institution_staff.dto";
import { UpdateInstitutionStaffDto } from "./dto/update-institution_staff.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { InstitutionStaff } from "./entities/institution_staff.entity";
import { Repository } from "typeorm";
import { HttpResponse } from "src/class/HttpResponse";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/page.dto";

@Injectable()
export class InstitutionStaffService {
  constructor(
    @InjectRepository(InstitutionStaff) public institutionStaffModel: Repository<InstitutionStaff>,
  ) {}
  async create(createInstitutionStaffDto: CreateInstitutionStaffDto) {
    try {
      const institutionStaf = await this.institutionStaffModel.save(createInstitutionStaffDto);

      return new HttpResponse().success(
        201,
        "institucion personal creado correctamente",
        institutionStaf,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Ocurrio un error al crear la institucion personal",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const { skip, order, take } = pageOptionsDto;
      const institutionStaf = await this.institutionStaffModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { id_institution_staff: order },
      });

      const itemCount = await this.institutionStaffModel.count({
        where: { status: true },
      });

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      const data = new PageDto(institutionStaf, pageMetaDto);

      return new HttpResponse().success(201, "Lista de institucion personal", data);
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener lista de institución personal",
      );
    }
  }

  async findOne(id_institution_staff: number) {
    try {
      const institutionStaf = await this.institutionStaffModel.findOne({ 
        where: {id_institution_staff, status: true },
        relations: ["type_staff", "staff", "institution"],
       });
      return new HttpResponse().success(
        200,
        "Obtención de una institución personal",
        institutionStaf,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener la institución personal",
      );
    }
  }

  async update(id_institution_staff: number, updateInstitutionStaffDto: UpdateInstitutionStaffDto) {
    try {
      const institutionStaf = await this.institutionStaffModel.update(id_institution_staff, updateInstitutionStaffDto);

      return new HttpResponse().success(
        201,
        "Resultado actualizado correctamente",
        institutionStaf,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar resultado",
      );
    }
  }

  async remove(id_institution_staff: number) {
    try {
      const institutionStaf = await this.institutionStaffModel.update(id_institution_staff, {
        status: false,
      });

      return new HttpResponse().success(
        201,
        "institucion personal eliminado correctamente",
        institutionStaf,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar institucion personal ",
      );
    }
  }
}
