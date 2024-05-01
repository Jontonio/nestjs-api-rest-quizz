import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UniqueCategoryIEName } from "src/decorators/CategoryInstitution";
export class CreateCategoryInstitutionDto {
  @MaxLength(50, {
    message:
      "El campo categoria institución debe tener como máximo 50 caracteres",
  })
  @IsString({ message: "El campo categoría institución debe ser STRING" })
  @UniqueCategoryIEName({
    message: "El nombre de la categoría de la institución debe ser única",
  })
  @IsNotEmpty({
    message: "El campo categoria institución es requerido ",
  })
  name_category_institution: string;
}
