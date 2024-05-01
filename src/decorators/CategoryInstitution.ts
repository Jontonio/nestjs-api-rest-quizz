import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { CategoryInstitution } from "src/category_institution/entities/category_institution.entity";
import { Repository } from "typeorm";

// Clase del decorador para verificar si existe una institución
@ValidatorConstraint({
  name: "ExistIdCategoryInstitutionValidator",
  async: true,
})
@Injectable()
export class ExistIdCategoryInstitutionValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(CategoryInstitution)
    public categoryIEModel: Repository<CategoryInstitution>,
  ) {}

  async validate(id_category_institution: number): Promise<boolean> {
    try {
      const report = await this.categoryIEModel.findOneBy({
        id_category_institution,
      });
      if (report) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(): string {
    return "La categoría de la institución a relacionar no se encuentra registrada";
  }
}

@ValidatorConstraint({ name: "UniqueCategoryIENameValidator", async: true })
@Injectable()
export class UniqueCategoryIENameValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(CategoryInstitution)
    public categoryInstitutionModel: Repository<CategoryInstitution>,
  ) {}

  async validate(value: string): Promise<boolean> {
    try {
      const existNameCategory = await this.categoryInstitutionModel.findOneBy({
        name_category_institution: value,
      });
      return !existNameCategory;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(): string {
    return "El nombre de la categoria de insitución ya se encuentra registrado ";
  }
}

// Nombre del decorador
export const UniqueCategoryIEName = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueCategoryIENameValidator,
    });
  };
};

// Nombre del decorador
export const ExistIdCategoryInstitution = (
  validationOptions?: ValidationOptions,
) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ExistIdCategoryInstitutionValidator,
    });
  };
};
