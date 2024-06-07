import {
  BadRequestException,
  HttpException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class ExistUserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    public userModel: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("El id del usuario es requerido.");
      }

      const existUser = await this.userModel.findOne({
        where: { id_user: Number(id) },
      });

      if (!existUser) {
        throw new NotFoundException(
          `El usuario con id ${id} no se encuentra registrado`,
        );
      }

      next();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
