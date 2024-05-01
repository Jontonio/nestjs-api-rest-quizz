import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { UniqueIDCardStaff } from "src/decorators/Staff";

export class CreateStaffDto {
  @UniqueIDCardStaff({ message: "El DNI personal a registrar debe ser único" })
  @MinLength(8, {
    message: "El DNI del personal debe tener como mínimo 8 dígitos",
  })
  @MaxLength(8, { message: "El DNI del personal debe tener 8 dígitos" })
  @IsString({ message: "El DNI del personal debe ser STRING" })
  @IsNotEmpty({ message: "El DNI del personal es requerido" })
  id_card_staff: string;

  @MaxLength(20, {
    message: "El nombre del personal debe tener como máximo 20 letras",
  })
  @Matches(/^[\p{L}\s]+$/u, {
    message: "El nombre del personal solo debe contener letras y espacios",
  })
  @IsNotEmpty({ message: "El nombre del personal es requerido" })
  name_staff: string;

  @MaxLength(20, {
    message: "El apellido paterno debe tener como máximo 20 letras",
  })
  @Matches(/^[\p{L}\s]+$/u, {
    message: "El apellido paterno solo debe contener letras y espacios",
  })
  @IsNotEmpty({ message: "El apellido paterno es requerido" })
  first_name_staff: string;

  @MaxLength(20, {
    message: "El apellido materno debe tener como máximo 20 letras",
  })
  @Matches(/^[\p{L}\s]+$/u, {
    message: "El apellido materno solo debe contener letras y espacios",
  })
  @IsNotEmpty({ message: "El apellido materno es requerido" })
  last_name_staff: string;
}
