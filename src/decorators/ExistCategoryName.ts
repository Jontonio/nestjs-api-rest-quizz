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

// Clase del decorador
@ValidatorConstraint({ name: "CategoryNameValidator", async: true })
@Injectable()
export class CategoryNameValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(CategoryInstitution) public categoryInstitutionModel: Repository<CategoryInstitution>,
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
export const ExistCategoryName = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CategoryNameValidator,
    });
  };
};
