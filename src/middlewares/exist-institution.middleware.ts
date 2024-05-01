import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { Institution } from "src/institution/entities/institution.entity";
import { Repository } from "typeorm";

@Injectable()
export class ExistInstitution implements NestMiddleware {
  constructor(
    @InjectRepository(Institution)
    public institutionModel: Repository<Institution>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      const { id } = req.params;
      const institution = await this.institutionModel.findOneBy({
        cod_mod_institution: id,
      });

      if (!institution) {
        throw new NotFoundException(
          `La institución con código modular ${id} no se encuentra registrado`,
          {
            cause: new Error(),
            description: NotFoundException.name,
          },
        );
      }
      next();
    } catch (error) {
      // Verifica si existe un error de NotFoundException
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Muestar el error en general
      throw new InternalServerErrorException("Ocurrio un error al actualizar", {
        cause: error,
        description: InternalServerErrorException.name,
      });
    }
  }
}
