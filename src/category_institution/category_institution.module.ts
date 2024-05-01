import { Module } from '@nestjs/common';
import { CategoryInstitutionService } from './category_institution.service';
import { CategoryInstitutionController } from './category_institution.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryInstitution } from "./entities/category_institution.entity";
import { CategoryNameValidator } from 'src/decorators/ExistCategoryName';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryInstitution])],
  controllers: [CategoryInstitutionController],
  providers: [CategoryInstitutionService, CategoryNameValidator]
})
export class CategoryInstitutionModule {}
