import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { Institution } from "src/institution/entities/institution.entity";
import { Repository } from "typeorm";

// Clase del decorador
@ValidatorConstraint({ name: "IdCodModInstitutionValidator", async: true })
@Injectable()
export class ExistIdCodModInstitutionValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(Institution)
    public institutionModel: Repository<Institution>,
  ) {}

  async validate(cod_mod_institution: string): Promise<boolean> {
    try {
      const report = await this.institutionModel.findOneBy({
        cod_mod_institution,
      });
      return report ? true : false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  defaultMessage(): string {
    return "El codigo modular de la institucion a relacionar no se encuentra registrado";
  }
}

// Clase del decorador
@ValidatorConstraint({ name: "IdCodModInstitutionValidator", async: true })
@Injectable()
export class UniqueCodModInstitutionValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(Institution)
    public institutionModel: Repository<Institution>,
  ) {}

  async validate(cod_mod_institution: string): Promise<boolean> {
    try {
      const institution = await this.institutionModel.findOneBy({
        cod_mod_institution,
      });
      return !institution;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  defaultMessage(): string {
    return "El codigo modular de la institucion ya se encuentra registrado, registre uno nuevo.";
  }
}

// Nombre del decorador
export const ExistCodModInstitution = (
  validationOptions?: ValidationOptions,
) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ExistIdCodModInstitutionValidator,
    });
  };
};

// Nombre del decorador
export const UniqueCodModInstitution = (
  validationOptions?: ValidationOptions,
) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueCodModInstitutionValidator,
    });
  };
};
