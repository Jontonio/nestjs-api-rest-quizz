import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { InstitutionService } from "./institution.service";
import { CreateInstitutionDto } from "./dto/create-institution.dto";
import { UpdateInstitutionDto } from "./dto/update-institution.dto";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";

@Controller("institution")
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.create(createInstitutionDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.institutionService.findAll(pageOptionsDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.institutionService.findOne(id);
  }

  @Get("get-one-ie-json/:modular_code")
  findOneJSON(@Param("modular_code") modular_code: string) {
    return this.institutionService.findOneJSON(modular_code);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionService.update(id, updateInstitutionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.institutionService.remove(id);
  }
}
