import { Module, RequestMethod } from "@nestjs/common";
import { InstitutionService } from "./institution.service";
import { InstitutionController } from "./institution.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Institution } from "./entities/institution.entity";
import { ExistIdCategoryInstitutionValidator } from "src/decorators/CategoryInstitution";
import { CategoryInstitution } from "src/category_institution/entities/category_institution.entity";
import { MiddlewareBuilder } from "@nestjs/core";
import { ExistInstitution } from "src/middlewares/exist-institution.middleware";
import { DuplicateInstitution } from "src/middlewares/duplicate-institution.middleware";
import { UniqueCodModInstitutionValidator } from "src/decorators/Institution";

@Module({
  imports: [TypeOrmModule.forFeature([Institution, CategoryInstitution])],
  controllers: [InstitutionController],
  providers: [
    InstitutionService,
    ExistIdCategoryInstitutionValidator,
    UniqueCodModInstitutionValidator,
  ],
})
export class InstitutionModule {
  configure(consumer: MiddlewareBuilder) {
    consumer
      .apply(ExistInstitution)
      .forRoutes(
        { path: "institution/:id", method: RequestMethod.PATCH },
        { path: "institution/:id", method: RequestMethod.GET },
        { path: "institution/:id", method: RequestMethod.DELETE },
      )
      .apply(DuplicateInstitution)
      .forRoutes({ path: "institution/:id", method: RequestMethod.PATCH });
  }
}
