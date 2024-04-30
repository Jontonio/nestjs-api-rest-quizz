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
import { TypeStaffService } from "./type-staff.service";
import { CreateTypeStaffDto } from "./dto/create-type-staff.dto";
import { UpdateTypeStaffDto } from "./dto/update-type-staff.dto";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";

@Controller("type-staff")
export class TypeStaffController {
  constructor(private readonly typeStaffService: TypeStaffService) {}

  @Post()
  create(@Body() createTypeStaff: CreateTypeStaffDto) {
    return this.typeStaffService.create(createTypeStaff);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.typeStaffService.findAll(pageOptionsDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.typeStaffService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTypeStaffDto: UpdateTypeStaffDto,
  ) {
    return this.typeStaffService.update(+id, updateTypeStaffDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.typeStaffService.remove(+id);
  }
}
