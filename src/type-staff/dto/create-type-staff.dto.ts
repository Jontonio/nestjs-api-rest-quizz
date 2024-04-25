import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ExistTypeNameStaff } from "src/decorators/ExistTypeNameStaff";

export class CreateTypeStaffDto {
  @MaxLength(50, {
    message: "El campo tipo de personal debe tener como máximo 50 caracteres",
  })
  @IsString({ message: "El campo tipo de personal debe ser STRING" })
  @ExistTypeNameStaff()
  @IsNotEmpty({
    message: "El campo tipo de personal es requerido (name_type_staff)",
  })
  name_type_staff: string;
}
