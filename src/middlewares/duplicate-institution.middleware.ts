import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { Institution } from "src/institution/entities/institution.entity";
import { Repository } from "typeorm";

@Injectable()
export class DuplicateInstitution implements NestMiddleware {
  constructor(
    @InjectRepository(Institution)
    public institutionModel: Repository<Institution>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      const { id } = req.params;
      const { cod_mod_institution } = req.body;

      if (cod_mod_institution) {
        const existingInstitution = await this.institutionModel.findOne({
          where: {
            cod_mod_institution,
          },
        });

        if (existingInstitution.cod_mod_institution !== id) {
          throw new BadRequestException(
            "El código modular proporcionado ya está en uso por otra institución.",
          );
        }
      }

      next();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        "Ocurrio un error al verificar duplicidad de datos",
      );
    }
  }
}
