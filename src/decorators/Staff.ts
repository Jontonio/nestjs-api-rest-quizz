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

// Decorador para evitar un registro doble de un personal
@ValidatorConstraint({ name: "UniqueIDCardStaffValidator", async: true })
@Injectable()
export class UniqueIDCardStaffValidator
  implements ValidatorConstraintInterface
{
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

// Nombre del decorador UniqueIDCardStaff
export const UniqueIDCardStaff = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueIDCardStaffValidator,
    });
  };
};

// Decorador verificar si existe un personal
@ValidatorConstraint({ name: "ExistIDCardStaffValidator", async: true })
@Injectable()
export class ExistIDCardStaffValidator implements ValidatorConstraintInterface {
  constructor(@InjectRepository(Staff) public staffModel: Repository<Staff>) {}

  async validate(value: string): Promise<boolean> {
    try {
      const staff = await this.staffModel.findOneBy({
        id_card_staff: value,
      });
      if (staff) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(): string {
    return "El personal a registrar ya existe, registre uno nuevo";
  }
}

// Nombre del decorador UniqueIDCardStaff
export const ExistIDCardStaff = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ExistIDCardStaffValidator,
    });
  };
};
