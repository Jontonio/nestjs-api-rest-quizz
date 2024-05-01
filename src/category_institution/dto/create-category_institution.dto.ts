import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ExistCategoryName } from "src/decorators/ExistCategoryName";
export class CreateCategoryInstitutionDto {
    @MaxLength(50, {
        message: "El campo categoria institución debe tener como máximo 50 caracteres",
      })
      @IsString({ message: "El campo categoria institución debe ser STRING" })
      @ExistCategoryName()
      @IsNotEmpty({
        message: "El campo categoria institución es requerido ", })
        name_category_institution: string;
}
