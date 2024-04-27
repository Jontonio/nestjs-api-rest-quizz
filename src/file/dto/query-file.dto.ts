import { IsNotEmpty } from "class-validator";

export class QueryFileDto {
  @IsNotEmpty({ message: "El campo (columns[]) es requerido" })
  columns: string[];
}
