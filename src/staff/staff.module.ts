import { Module, RequestMethod } from "@nestjs/common";
import { StaffService } from "./staff.service";
import { StaffController } from "./staff.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Staff } from "./entities/staff.entity";
import { MiddlewareBuilder } from "@nestjs/core";
import { ExistStaff } from "src/middlewares/exist-staff.middleware";
import { IdCardStaffValidator } from "src/decorators/IdCardStaff";

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  controllers: [StaffController],
  providers: [StaffService, IdCardStaffValidator],
})
export class StaffModule {
  configure(consumer: MiddlewareBuilder) {
    consumer
      .apply(ExistStaff)
      .forRoutes(
        { path: "staff/:id", method: RequestMethod.PATCH },
        { path: "staff/:id", method: RequestMethod.GET },
        { path: "staff/:id", method: RequestMethod.DELETE },
      );
  }
}
