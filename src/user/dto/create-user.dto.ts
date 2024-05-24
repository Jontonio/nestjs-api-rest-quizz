import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Role } from "src/role/entities/role.entity";

export class CreateUserDto {

    @IsNotEmpty({ message: "El id del rol a relacionar es requerido" })
    role: Role; 

    @MaxLength(100, {
        message:
          "El campo email debe tener como máximo 100 caracteres",
      })
      @IsString({ message: "El campo email debe ser STRING" })
      
      @IsNotEmpty({
        message: "El campo  email  es requerido ",
      })
      email: string;

      
      @IsNotEmpty({
        message: "El campo  password  es requerido ",
      })
      password: string;
}
