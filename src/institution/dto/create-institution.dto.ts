import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { CategoryInstitution } from "src/category_institution/entities/category_institution.entity";
import { ExistIdCategoryInstitution } from "src/decorators/CategoryInstitution";
import { UniqueCodModInstitution } from "src/decorators/Institution";

export class CreateInstitutionDto {
  // create decorator for verify cod modular duplicate
  @UniqueCodModInstitution({
    message:
      "El codigo modular de la institucion ya se encuentra registrado, registre uno nuevo.",
  })
  @MinLength(7, {
    message:
      "El código modular de la institución debe tener como mínimo 7 dígitos",
  })
  @MaxLength(7, {
    message:
      "El código modular de la institución debe tener 7 dígitos como máximo",
  })
  @IsString({
    message: "El código modular de la institución debe ser cadena de texto",
  })
  @IsNotEmpty({ message: "El código modular de la institución es requerida" })
  cod_mod_institution: string;

  @MaxLength(100, {
    message: "El nombre de la institución debe tener 100 letras como máximo",
  })
  @IsNotEmpty({ message: "El nombre de la institución es requerida" })
  name_institution: string;

  @MaxLength(30, {
    message:
      "El nivel/modalidad de la institución debe tener 30 letras como máximo",
  })
  @IsNotEmpty({ message: "El nivel/modalidad de la institución es requerida" })
  level_modality: string;

  @MaxLength(100, {
    message: "La dirección de la institución debe tener 100 letras como máximo",
  })
  @IsNotEmpty({ message: "La direción de la institución es requerida" })
  address_institution: string;

  @MaxLength(30, {
    message:
      "La administración de dependencia debe tener 30 letras como máximo",
  })
  @IsNotEmpty({
    message: "La administración de dependencia de la institución es requerida",
  })
  managment_dependency_institution: string;

  @ExistIdCategoryInstitution({
    message:
      "El id de la categoría de la institución no se encuentra registrada",
  })
  @IsNotEmpty({
    message: "El id de la categoría de la institución es requerida",
  })
  category_institution: CategoryInstitution;
}
