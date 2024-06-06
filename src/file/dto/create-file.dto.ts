import { IsNotEmpty } from "class-validator";
import { ExistCodModInstitution } from "src/decorators/Institution";
import { Institution } from "src/institution/entities/institution.entity";

export class CreateFileDto {
  @ExistCodModInstitution({
    message: "El código modular de la institución no se encuentra registrada",
  })
  @IsNotEmpty({
    message: "El id de la institución es requerida",
  })
  institution: Institution;
}
