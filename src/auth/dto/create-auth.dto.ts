import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {
  @IsNotEmpty({ message: "El email es requerido" })
  email: string;
  @IsNotEmpty({ message: "El password es requerido" })
  password: string;
}
