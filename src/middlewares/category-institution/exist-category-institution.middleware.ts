import {
  BadRequestException,
  HttpException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isNumber } from "class-validator";
import { Request, Response } from "express";
import { CategoryInstitution } from "src/category_institution/entities/category_institution.entity";
import { Repository } from "typeorm";

@Injectable()
export class ExistCategoryInstitutionMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(CategoryInstitution)
    public categoryIEModel: Repository<CategoryInstitution>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException(
          "El id de la categoria institución es requerido.",
        );
      }

      if (!isNumber(+id)) {
        throw new BadRequestException(
          "El id de la categoria institución debe ser númerico",
        );
      }

      const existCategoriaUser = await this.categoryIEModel.findOne({
        where: { id_category_institution: Number(id) },
      });

      if (!existCategoriaUser) {
        throw new NotFoundException(
          `La categoria institución con id ${id} no se encuentra registrado`,
        );
      }

      next();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
