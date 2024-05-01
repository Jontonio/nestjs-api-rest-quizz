import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { ExistIdCardStaff } from "src/decorators/IdCardStaff";
import { ExistIdTypeStaff } from "src/decorators/IdTypeStaff";
import { ExistCodModInstitution } from "src/decorators/codmodinstitution";
import { TypeStaff } from "src/type-staff/entities/type-staff.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { Institution } from "src/institution/entities/institution.entity";

export class CreateInstitutionStaffDto {

      @ExistIdTypeStaff()
      @IsNotEmpty({ message: "El id del tipo personal a relacionar es requerido" })
      type_staff: TypeStaff;

      //@ExistIdCardStaff()
      @IsNotEmpty({ message: "El Dni del personal a relacionar es requerido" })
      staff: Staff;

      @ExistCodModInstitution()
      @IsNotEmpty({ message: "El codigo modular de la institución a relacionar es requerido" })
      institution: Institution;
}
