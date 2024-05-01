import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { Staff } from "src/staff/entities/staff.entity";
import { Repository } from "typeorm";

@Injectable()
export class ExistStaff implements NestMiddleware {
  constructor(@InjectRepository(Staff) public staffModel: Repository<Staff>) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      const { id } = req.params;
      const staff = await this.staffModel.findOneBy({
        id_card_staff: id,
      });

      if (!staff) {
        throw new NotFoundException(
          `El personal con DNI ${id} no se encuentra registrado`,
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
