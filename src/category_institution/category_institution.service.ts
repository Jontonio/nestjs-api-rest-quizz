import { Injectable } from '@nestjs/common';
import { CreateCategoryInstitutionDto } from './dto/create-category_institution.dto';
import { UpdateCategoryInstitutionDto } from './dto/update-category_institution.dto';

@Injectable()
export class CategoryInstitutionService {
  create(createCategoryInstitutionDto: CreateCategoryInstitutionDto) {
    return 'This action adds a new categoryInstitution';
  }

  findAll() {
    return `This action returns all categoryInstitution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryInstitution`;
  }

  update(id: number, updateCategoryInstitutionDto: UpdateCategoryInstitutionDto) {
    return `This action updates a #${id} categoryInstitution`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryInstitution`;
  }
}
