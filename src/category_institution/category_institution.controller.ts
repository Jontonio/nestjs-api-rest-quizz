import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryInstitutionService } from './category_institution.service';
import { CreateCategoryInstitutionDto } from './dto/create-category_institution.dto';
import { UpdateCategoryInstitutionDto } from './dto/update-category_institution.dto';

@Controller('category-institution')
export class CategoryInstitutionController {
  constructor(private readonly categoryInstitutionService: CategoryInstitutionService) {}

  @Post()
  create(@Body() createCategoryInstitutionDto: CreateCategoryInstitutionDto) {
    return this.categoryInstitutionService.create(createCategoryInstitutionDto);
  }

  @Get()
  findAll() {
    return this.categoryInstitutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryInstitutionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryInstitutionDto: UpdateCategoryInstitutionDto) {
    return this.categoryInstitutionService.update(+id, updateCategoryInstitutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryInstitutionService.remove(+id);
  }
}
