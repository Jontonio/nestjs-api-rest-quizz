import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { Role } from "src/role/entities/role.entity";
import { Repository } from "typeorm";

// Clase del decorador para verificar si existe un rol
@ValidatorConstraint({
  name: "ExistRoleValidator",
  async: true,
})
@Injectable()
export class ExistRoleValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Role)
    public roleModel: Repository<Role>,
  ) {}

  async validate(id_role: number): Promise<boolean> {
    try {
      const role = await this.roleModel.findOneBy({ id_role });
      return role ? true : false;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(): string {
    return "El rol a relacionar no se encuentra registrado";
  }
}

// Nombre del decorador
export const ExistRole = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ExistRoleValidator,
    });
  };
};
