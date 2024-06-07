import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ExistRole } from "src/decorators/Role";
import { UniqueEmailUser, UniqueIdCardUser } from "src/decorators/User";
import { Role } from "src/role/entities/role.entity";

export class CreateUserDto {
  @ExistRole({ message: "El rol a relacionar no se encuentra registrado" })
  @IsNotEmpty({ message: "El id del rol a relacionar es requerido" })
  role: Role;

  @UniqueIdCardUser({
    message: "El DNI a registrar debe ser único, registre uno nuevo",
  })
  @MaxLength(10, {
    message: "El DNI debe tener como máximo 10 caracteres",
  })
  @IsNotEmpty({ message: "El DNI del usuario es requerido" })
  id_card: string;

  @MaxLength(45, {
    message: "Los nombres deben tener como máximo 45 caracteres",
  })
  @IsNotEmpty({ message: "Los nombres del usuario son requeridos" })
  names: string;

  @MaxLength(100, {
    message: "Los apellidos deben tener como máximo 100 caracteres",
  })
  @IsNotEmpty({ message: "Los apellidos del usuario son requeridos" })
  full_name: string;

  @MaxLength(100, {
    message: "El campo email debe tener como máximo 100 caracteres",
  })
  @IsString({ message: "El campo email debe ser STRING" })
  @UniqueEmailUser({
    message: "El email a registrar ya existe, registre uno nuevo",
  })
  @IsNotEmpty({
    message: "El campo email es requerido ",
  })
  email: string;
}
