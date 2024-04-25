import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { InstitutionStaffService } from "./institution_staff.service";
import { CreateInstitutionStaffDto } from "./dto/create-institution_staff.dto";
import { UpdateInstitutionStaffDto } from "./dto/update-institution_staff.dto";

@Controller("institution-staff")
export class InstitutionStaffController {
  constructor(
    private readonly institutionStaffService: InstitutionStaffService,
  ) {}

  @Post()
  create(@Body() createInstitutionStaffDto: CreateInstitutionStaffDto) {
    return this.institutionStaffService.create(createInstitutionStaffDto);
  }

  @Get()
  findAll() {
    return this.institutionStaffService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.institutionStaffService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInstitutionStaffDto: UpdateInstitutionStaffDto,
  ) {
    return this.institutionStaffService.update(+id, updateInstitutionStaffDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.institutionStaffService.remove(+id);
  }
}
