import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { QueryFileDto } from "./dto/query-file.dto";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const fileExtension = extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    cb(null, fileName);
  },
});

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file", { storage }))
  create(
    @Body() createFileDto: CreateFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.create(createFileDto, file);
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
