import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UniqueTypeNameStaff } from "src/decorators/TypeStaff";

export class CreateTypeStaffDto {
  @MaxLength(50, {
    message: "El campo tipo de personal debe tener como máximo 50 caracteres",
  })
  @IsString({ message: "El campo tipo de personal debe ser STRING" })
  @UniqueTypeNameStaff({
    message: "El nombre del tipo personal debe ser único",
  })
  @IsNotEmpty({
    message: "El campo tipo de personal es requerido (name_type_staff)",
  })
  name_type_staff: string;
}
