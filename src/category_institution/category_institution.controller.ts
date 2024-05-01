import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryInstitutionService } from './category_institution.service';
import { CreateCategoryInstitutionDto } from './dto/create-category_institution.dto';
import { UpdateCategoryInstitutionDto } from './dto/update-category_institution.dto';
import { PageOptionsDto } from 'src/helpers/PageOptionsDto.dto';

@Controller('category-institution')
export class CategoryInstitutionController {
  constructor(private readonly categoryInstitutionService: CategoryInstitutionService) {}

  @Post()
  create(@Body() createCategoryInstitutionDto: CreateCategoryInstitutionDto) {
    return this.categoryInstitutionService.create(createCategoryInstitutionDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.categoryInstitutionService.findAll(pageOptionsDto);
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
