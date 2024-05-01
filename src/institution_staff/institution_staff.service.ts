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
    @InjectRepository(InstitutionStaff)
    public institutionStaffModel: Repository<InstitutionStaff>,
  ) {}
  async create(createInstitutionStaffDto: CreateInstitutionStaffDto) {
    try {
      const institutionStaff = await this.institutionStaffModel.save(
        createInstitutionStaffDto,
      );

      return new HttpResponse().success(
        201,
        "Institución personal creado correctamente",
        institutionStaff,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al crear la institución personal",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const { skip, order, take } = pageOptionsDto;
      const institutionStaff = await this.institutionStaffModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { id_institution_staff: order },
      });

      const itemCount = await this.institutionStaffModel.count({
        where: { status: true },
      });

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      const data = new PageDto(institutionStaff, pageMetaDto);

      return new HttpResponse().success(
        201,
        "Lista de institución personal",
        data,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener lista de institución personal",
      );
    }
  }

  async findOne(id_institution_staff: number) {
    try {
      const institutionStaff = await this.institutionStaffModel.findOne({
        where: { id_institution_staff, status: true },
        relations: ["type_staff", "staff", "institution"],
      });
      return new HttpResponse().success(
        200,
        "Obtención de una institución personal",
        institutionStaff,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener la institución personal",
      );
    }
  }

  async update(
    id_institution_staff: number,
    updateInstitutionStaffDto: UpdateInstitutionStaffDto,
  ) {
    try {
      const institutionStaff = await this.institutionStaffModel.update(
        id_institution_staff,
        updateInstitutionStaffDto,
      );

      return new HttpResponse().success(
        201,
        "Institución personal actualizado correctamente",
        institutionStaff,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar institución personal",
      );
    }
  }

  async remove(id_institution_staff: number) {
    try {
      const institutionStaff = await this.institutionStaffModel.update(
        id_institution_staff,
        {
          status: false,
        },
      );

      return new HttpResponse().success(
        201,
        "Institución personal eliminado correctamente",
        institutionStaff,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar institución personal ",
      );
    }
  }
}
