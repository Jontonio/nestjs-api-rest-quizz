import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { Staff } from "src/staff/entities/staff.entity";
import { Repository } from "typeorm";

// Clase del decorador
@ValidatorConstraint({ name: "IdCardStaffValidator", async: true })
@Injectable()
export class IdCardStaffValidator implements ValidatorConstraintInterface {
  constructor(@InjectRepository(Staff) public staffModel: Repository<Staff>) {}

  async validate(value: string): Promise<boolean> {
    try {
      const staff = await this.staffModel.findOneBy({
        id_card_staff: value,
      });
      return !staff;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(): string {
    return "El personal a registrar ya existe, registre uno nuevo";
  }
}

// Nombre del decorador
export const ExistIdCardStaff = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IdCardStaffValidator,
    });
  };
};
