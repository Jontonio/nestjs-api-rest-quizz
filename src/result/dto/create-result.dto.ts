import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { ExistIdReport } from "src/decorators/IdReport";

export class CreateResultDto {
  @MaxLength(50, {
    message: "El item resultado debe ser como máximo 50 letras",
  })
  @IsNotEmpty({ message: "El item resultado es requerido" })
  result_item: string;

  @IsNumber({}, { message: "El valor del resultado debe ser númerico" })
  @IsNotEmpty({ message: "El valor del resultado es requerido" })
  result_value: number;

  @ExistIdReport()
  @IsNumber({}, { message: "El id del reporte debe ser númerico" })
  @IsNotEmpty({ message: "El id del reporte a relacionar es requerido" })
  id_report: number;
}
