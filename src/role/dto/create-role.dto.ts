import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateRoleDto {
  @MaxLength(50, {
    message: "El campo rol debe tener como máximo 50 caracteres",
  })
  @IsString({ message: "El campo rol debe ser STRING" })
  @IsNotEmpty({
    message: "El campo role es requerido ",
  })
  name_role: string;
}
