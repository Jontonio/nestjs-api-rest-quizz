import { Injectable } from "@nestjs/common";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { EntityManager } from "typeorm";

// Clase del decorador
@ValidatorConstraint({ name: "TypeNameStaffValidator", async: true })
@Injectable()
export class TypeNameStaffValidator implements ValidatorConstraintInterface {

  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: string): Promise<boolean> {
    try {
      const existNameType = await this.entityManager.getRepository('type_staff')
                .createQueryBuilder('type_staff')
                .where({['name_type_staff']: value})
                .getExists()
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
export const ExistTypeNameStaff = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: TypeNameStaffValidator,
    });
  };
};
