import { Module, RequestMethod } from "@nestjs/common";
import { TypeStaffService } from "./type-staff.service";
import { TypeStaffController } from "./type-staff.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeStaff } from "./entities/type-staff.entity";
import { MiddlewareBuilder } from "@nestjs/core";
import { ExistTypeStaffMiddleware } from "src/middlewares/exist-type-staff.middleware";
import { TypeNameStaffValidator } from "src/decorators/ExistTypeNameStaff";

@Module({
  imports: [TypeOrmModule.forFeature([TypeStaff])],
  controllers: [TypeStaffController],
  providers: [TypeStaffService, TypeNameStaffValidator],
})
export class TypeStaffModule {
  configure(consumer: MiddlewareBuilder) {
    // consumer.apply(ExistTypeStaffMiddleware).forRoutes(TypeStaffController);
    consumer
      .apply(ExistTypeStaffMiddleware)
      .forRoutes({ path: "type-staff/:id", method: RequestMethod.PATCH });
  }
}
