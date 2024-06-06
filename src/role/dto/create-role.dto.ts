import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateRoleDto {
      @MaxLength(50, {
        message:
          "El campo permiso debe tener como máximo 50 caracteres",
      })
      @IsString({ message: "El campo permiso debe ser STRING" })
      
      @IsNotEmpty({
        message: "El campo  permiso  es requerido ",
      })
      name_role: string;
}
