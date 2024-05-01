import { Module } from "@nestjs/common";
import { InstitutionStaffService } from "./institution_staff.service";
import { InstitutionStaffController } from "./institution_staff.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstitutionStaff } from "./entities/institution_staff.entity";
import { IdCodModInstitutionValidator } from "src/decorators/codmodinstitution";
import { Institution } from "src/institution/entities/institution.entity";
import { TypeStaff } from "src/type-staff/entities/type-staff.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { IdTypeStaffValidator } from "src/decorators/IdTypeStaff";
import { IdCardStaffValidator } from "src/decorators/IdCardStaff";

@Module({
  imports: [TypeOrmModule.forFeature([InstitutionStaff, Institution, TypeStaff, Staff])],
  controllers: [InstitutionStaffController],
  providers: [InstitutionStaffService, IdCodModInstitutionValidator, IdTypeStaffValidator, IdCardStaffValidator],
})
export class InstitutionStaffModule {}
