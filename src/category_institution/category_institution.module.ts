import { Module } from "@nestjs/common";
import { CategoryInstitutionService } from "./category_institution.service";
import { CategoryInstitutionController } from "./category_institution.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryInstitution } from "./entities/category_institution.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryInstitution])],
  controllers: [CategoryInstitutionController],
  providers: [CategoryInstitutionService],
})
export class CategoryInstitutionModule {}
