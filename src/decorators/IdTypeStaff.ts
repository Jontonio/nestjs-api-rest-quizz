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

// Clase del decorador
@ValidatorConstraint({ name: "IdTypeStaffValidator", async: true })
@Injectable()
export class IdTypeStaffValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(TypeStaff) public typeStaffModel: Repository<TypeStaff>,
  ) {}

  async validate(id_type_staff: number): Promise<boolean> {
    try {
      const report = await this.typeStaffModel.findOneBy({ id_type_staff });
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
    return "El id del tipo de personal a relacionar no se encuentra registrado";
  }
}

// Nombre del decorador
export const ExistIdTypeStaff = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IdTypeStaffValidator,
    });
  };
};
