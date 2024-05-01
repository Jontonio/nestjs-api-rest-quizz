import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { Report } from "src/report/entities/report.entity";
import { Repository } from "typeorm";

// Clase del decorador
@ValidatorConstraint({ name: "IdReportValidator", async: true })
@Injectable()
export class IdReportValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Report) public reportModel: Repository<Report>,
  ) {}

  async validate(id_report: number): Promise<boolean> {
    try {
      const report = await this.reportModel.findOneBy({ id_report });
      if (report) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  defaultMessage(): string {
    return "El id del reporte a relacionar no se encuentra registrado";
  }
}

// Nombre del decorador
export const ExistIdReport = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IdReportValidator,
    });
  };
};
