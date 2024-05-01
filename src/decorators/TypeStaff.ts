import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { TypeStaff } from "src/type-staff/entities/type-staff.entity";
import { Repository } from "typeorm";

// Clase del decorador para evitar el duplicado de nombre de tipos de personal
@ValidatorConstraint({ name: "UniqueTypeNameStaffValidator", async: true })
@Injectable()
export class UniqueTypeNameStaffValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(TypeStaff) public typeStaffModel: Repository<TypeStaff>,
  ) {}

  async validate(value: string): Promise<boolean> {
    try {
      const existNameType = await this.typeStaffModel.findOneBy({
        name_type_staff: value,
      });
      return !existNameType;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(): string {
    return "El nombre del tipo de personal ya se encuentra registrado (name_type_staff)";
  }
}

// Nombre del decorador
export const UniqueTypeNameStaff = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueTypeNameStaffValidator,
    });
  };
};
