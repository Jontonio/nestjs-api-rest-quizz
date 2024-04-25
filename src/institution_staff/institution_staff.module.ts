import { Module } from "@nestjs/common";
import { InstitutionStaffService } from "./institution_staff.service";
import { InstitutionStaffController } from "./institution_staff.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstitutionStaff } from "./entities/institution_staff.entity";

@Module({
  imports: [TypeOrmModule.forFeature([InstitutionStaff])],
  controllers: [InstitutionStaffController],
  providers: [InstitutionStaffService],
})
export class InstitutionStaffModule {}
