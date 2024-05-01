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
import { ResultService } from "./result.service";
import { CreateResultDto } from "./dto/create-result.dto";
import { UpdateResultDto } from "./dto/update-result.dto";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";

@Controller("result")
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.resultService.findAll(pageOptionsDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.resultService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(+id, updateResultDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.resultService.remove(+id);
  }
}
