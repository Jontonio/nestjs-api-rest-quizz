import { Module } from "@nestjs/common";
import { CategoryInstitutionService } from "./category_institution.service";
import { CategoryInstitutionController } from "./category_institution.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryInstitution } from "./entities/category_institution.entity";
import { UniqueCategoryIENameValidator } from "src/decorators/CategoryInstitution";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryInstitution])],
  controllers: [CategoryInstitutionController],
  providers: [CategoryInstitutionService, UniqueCategoryIENameValidator],
})
export class CategoryInstitutionModule {}
