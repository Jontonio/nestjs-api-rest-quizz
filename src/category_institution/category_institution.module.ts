import { Module, RequestMethod } from "@nestjs/common";
import { CategoryInstitutionService } from "./category_institution.service";
import { CategoryInstitutionController } from "./category_institution.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryInstitution } from "./entities/category_institution.entity";
import { UniqueCategoryIENameValidator } from "src/decorators/CategoryInstitution";
import { MiddlewareBuilder } from "@nestjs/core";
import { ExistCategoryInstitutionMiddleware } from "src/middlewares/category-institution/exist-category-institution.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryInstitution])],
  controllers: [CategoryInstitutionController],
  providers: [CategoryInstitutionService, UniqueCategoryIENameValidator],
})
export class CategoryInstitutionModule {
  configure(consumer: MiddlewareBuilder) {
    consumer.apply(ExistCategoryInstitutionMiddleware).forRoutes({
      path: "category-institution/:id",
      method: RequestMethod.GET,
    });
  }
}
