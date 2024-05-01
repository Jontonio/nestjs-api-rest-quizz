import { Module } from "@nestjs/common";
import { InstitutionStaffService } from "./institution_staff.service";
import { InstitutionStaffController } from "./institution_staff.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstitutionStaff } from "./entities/institution_staff.entity";
import { ExistIdCodModInstitutionValidator } from "src/decorators/Institution";
import { Institution } from "src/institution/entities/institution.entity";
import { TypeStaff } from "src/type-staff/entities/type-staff.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { ExistIdTypeStaffValidator } from "src/decorators/TypeStaff";
import { ExistIDCardStaffValidator } from "src/decorators/Staff";

@Module({
  imports: [
    TypeOrmModule.forFeature([InstitutionStaff, Institution, TypeStaff, Staff]),
  ],
  controllers: [InstitutionStaffController],
  providers: [
    InstitutionStaffService,
    ExistIdCodModInstitutionValidator,
    ExistIdTypeStaffValidator,
    ExistIDCardStaffValidator,
  ],
})
export class InstitutionStaffModule {}
