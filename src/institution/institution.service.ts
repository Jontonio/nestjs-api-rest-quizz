import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateInstitutionDto } from "./dto/create-institution.dto";
import { UpdateInstitutionDto } from "./dto/update-institution.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Institution } from "./entities/institution.entity";
import { Repository } from "typeorm";
import { HttpResponse } from "src/class/HttpResponse";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/Page.dto";
import { institutionData } from "src/resources/dataInstituciones";

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    public institutionModel: Repository<Institution>,
  ) {}

  async create(createInstitutionDto: CreateInstitutionDto) {
    try {
      const institution = await this.institutionModel.save(
        createInstitutionDto,
      );
      return new HttpResponse().success(
        201,
        "Institución educativa creada correctamente",
        institution,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al crear el institución",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const { skip, order, take } = pageOptionsDto;
      const institutions = await this.institutionModel.find({
        where: { status: true },
        relations: ["category_institution"],
        skip: skip,
        take: take,
        order: { cod_mod_institution: order },
      });

      const itemCount = await this.institutionModel.count({
        where: { status: true },
      });

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      const data = new PageDto(institutions, pageMetaDto);

      return new HttpResponse().success(201, "Lista de instituciones", data);
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener lista de instituciones",
      );
    }
  }

  async findOne(cod_mod_institution: string) {
    try {
      const institution = await this.institutionModel.findOne({
        where: { cod_mod_institution, status: true },
        relations: ["category_institution"],
      });
      return new HttpResponse().success(
        200,
        "Obtención de una institución",
        institution,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener institución",
      );
    }
  }

  async findOneJSON(modular_code: string) {
    try {
      const institution = institutionData.filter((institution: any) =>
        institution.modular_code.startsWith(modular_code),
      );

      if (institution.length == 0) {
        throw new NotFoundException(
          `No se encontró resultados con código modular ${modular_code}`,
        );
      }

      return new HttpResponse().success(
        200,
        "Obtención de una institución",
        institution,
      );
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async update(
    cod_mod_institution: string,
    updateInstitutionDto: UpdateInstitutionDto,
  ) {
    try {
      const institution = await this.institutionModel.update(
        cod_mod_institution,
        updateInstitutionDto,
      );

      return new HttpResponse().success(
        200,
        "Institución actualizada correctamente",
        institution,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar institución",
      );
    }
  }

  async remove(cod_mod_institution: string) {
    try {
      const institution = await this.institutionModel.update(
        cod_mod_institution,
        {
          status: false,
        },
      );

      return new HttpResponse().success(
        201,
        "Institución eliminada correctamente",
        institution,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar institución",
      );
    }
  }
}
