import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class QueryFileDto {
  @IsNotEmpty({ message: "El campo (columns[]) es requerido" })
  columns: string[];
}

export class QueryGradeSectionFileDto {
  @Max(6, { message: "El campo grado debe ser como máximo grado 6" })
  @Min(1, { message: "El campo grado debe ser como mínimo grado 1" })
  @IsNumber({}, { message: "El campo grado debe ser númerico" })
  @IsNotEmpty({ message: "El campo grado es requerido" })
  grade: number;

  @IsNotEmpty({ message: "El campo sección es requerido" })
  section: string;

  @IsNotEmpty({ message: "El campo (columns[]) es requerido" })
  columns: string[];
}
