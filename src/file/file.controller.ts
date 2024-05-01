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
import { FileService } from "./file.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { QueryFileDto } from "./dto/query-file.dto";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.fileService.findAll(pageOptionsDto);
  }

  @Get("/generate-statistics-information")
  testResponseFile(
    @Query("interpreted") interpreted: string,
    @Body() queryFileDto: QueryFileDto,
  ) {
    return this.fileService.generateStatisticsInformation(
      queryFileDto,
      interpreted,
    );
  }

  @Get("/load-file")
  loadFile() {
    return this.fileService.loadFile();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.fileService.remove(+id);
  }
}
