import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { Result } from "src/result/entities/result.entity";
import { Repository } from "typeorm";

@Injectable()
export class ExistResult implements NestMiddleware {
  constructor(
    @InjectRepository(Result) public resultModel: Repository<Result>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      const { id } = req.params;
      const result = await this.resultModel.findOneBy({
        id_result: Number(id),
      });

      if (!result) {
        throw new NotFoundException(
          `El resultado con id ${id} no se encuentra registrado`,
        );
      }
      next();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.response);
    }
  }
}
