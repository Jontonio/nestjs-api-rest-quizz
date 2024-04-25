import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryInstitutionDto } from './create-category_institution.dto';

export class UpdateCategoryInstitutionDto extends PartialType(CreateCategoryInstitutionDto) {}
