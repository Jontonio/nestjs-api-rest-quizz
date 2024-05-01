import { PartialType } from "@nestjs/mapped-types";
import { CreateInstitutionStaffDto } from "./create-institution_staff.dto";

export class UpdateInstitutionStaffDto extends PartialType(
  CreateInstitutionStaffDto,
) {}
