import { Module, RequestMethod } from "@nestjs/common";
import { TypeStaffService } from "./type-staff.service";
import { TypeStaffController } from "./type-staff.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeStaff } from "./entities/type-staff.entity";
import { MiddlewareBuilder } from "@nestjs/core";
import { ExistTypeStaff } from "src/middlewares/exist-type-staff.middleware";
import { UniqueTypeNameStaffValidator } from "src/decorators/TypeStaff";

@Module({
  imports: [TypeOrmModule.forFeature([TypeStaff])],
  controllers: [TypeStaffController],
  providers: [TypeStaffService, UniqueTypeNameStaffValidator],
})
export class TypeStaffModule {
  configure(consumer: MiddlewareBuilder) {
    consumer
      .apply(ExistTypeStaff)
      .forRoutes(
        { path: "type-staff/:id", method: RequestMethod.PATCH },
        { path: "type-staff/:id", method: RequestMethod.GET },
        { path: "type-staff/:id", method: RequestMethod.DELETE },
      );
  }
}
