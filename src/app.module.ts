import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeStaffModule } from "./type-staff/type-staff.module";
import { DbModule } from "./db/db.module";
import { ConfigModule } from "./config/config.module";
import { StaffModule } from "./staff/staff.module";
import { CategoryInstitutionModule } from "./category_institution/category_institution.module";
import { ResultModule } from "./result/result.module";
import { ReportModule } from "./report/report.module";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { PermissionModule } from "./permission/permission.module";
import { RolePermissionModule } from "./role_permission/role_permission.module";
import { FileModule } from "./file/file.module";
import { InstitutionStaffModule } from "./institution_staff/institution_staff.module";
import { InstitutionModule } from "./institution/institution.module";

@Module({
  imports: [
    ConfigModule,
    DbModule,
    TypeStaffModule,
    UserModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    FileModule,
    InstitutionStaffModule,
    InstitutionModule,
    StaffModule,
    CategoryInstitutionModule,
    ResultModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
