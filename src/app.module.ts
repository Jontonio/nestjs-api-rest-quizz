import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeStaffModule } from "./type-staff/type-staff.module";
import { DbModule } from "./db/db.module";
import { ConfigModule } from "./config/config.module";
import { StaffModule } from './staff/staff.module';
import { CategoryInstitutionModule } from './category_institution/category_institution.module';
import { ResultModule } from './result/result.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [ConfigModule, DbModule, TypeStaffModule, StaffModule, CategoryInstitutionModule, ResultModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
