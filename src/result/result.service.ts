import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateResultDto } from "./dto/create-result.dto";
import { UpdateResultDto } from "./dto/update-result.dto";
import { HttpResponse } from "src/class/HttpResponse";
import { Result } from "./entities/result.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/Page.dto";

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result) public resultModel: Repository<Result>,
  ) {}

  async create(createResultDto: CreateResultDto) {
    try {
      const result = await this.resultModel.save({
        ...createResultDto,
        report: { id_report: createResultDto.id_report },
      });

      return new HttpResponse().success(
        201,
        "Resultado creado correctamente",
        result,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Ocurrio un error al crear el resultado",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const { skip, order, take } = pageOptionsDto;
      const results = await this.resultModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { id_result: order },
      });

      const itemCount = await this.resultModel.count({
        where: { status: true },
      });

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      const data = new PageDto(results, pageMetaDto);

      return new HttpResponse().success(201, "Lista de resultado", data);
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener lista de resultados",
      );
    }
  }

  async findOne(id_result: number) {
    try {
      const result = await this.resultModel.findOneBy({ id_result });
      return new HttpResponse().success(
        200,
        "Obtención de un resultado",
        result,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener el resultado",
      );
    }
  }

  async update(id_result: number, updateResultDto: UpdateResultDto) {
    try {
      const result = await this.resultModel.update(id_result, updateResultDto);

      return new HttpResponse().success(
        201,
        "Resultado actualizado correctamente",
        result,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar resultado",
      );
    }
  }

  async remove(id_result: number) {
    try {
      const result = await this.resultModel.update(id_result, {
        status: false,
      });

      return new HttpResponse().success(
        201,
        "Resultado eliminado correctamente",
        result,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar resultado",
      );
    }
  }
}
