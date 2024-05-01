import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { ExistCodModInstitution } from "src/decorators/Institution";
import { TypeStaff } from "src/type-staff/entities/type-staff.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { Institution } from "src/institution/entities/institution.entity";
import { ExistIdTypeStaff } from "src/decorators/TypeStaff";
import { ExistIDCardStaff } from "src/decorators/Staff";

export class CreateInstitutionStaffDto {
  @ExistIdTypeStaff({
    message: "El id del tipo de personal no se encuestra registrado",
  })
  @IsNotEmpty({ message: "El id del tipo personal a relacionar es requerido" })
  type_staff: TypeStaff;

  @ExistIDCardStaff({
    message: "El DNI del personal no se encuentra registrado",
  })
  @IsNotEmpty({ message: "El Dni del personal a relacionar es requerido" })
  staff: Staff;

  @ExistCodModInstitution({
    message: "El código modular de la institución no se encuentra registrado",
  })
  @IsNotEmpty({
    message: "El codigo modular de la institución a relacionar es requerido",
  })
  institution: Institution;
}
