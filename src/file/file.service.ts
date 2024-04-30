import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { ExcelFile } from "src/class/ExcelFile";
import { OpenIaService } from "src/open-ia/open-ia.service";
import { HttpResponse } from "src/class/HttpResponse";
import { QueryFileDto } from "./dto/query-file.dto";

@Injectable()
export class FileService {
  constructor(private readonly openaiService: OpenIaService) {}

  create(createFileDto: CreateFileDto) {
    return "This action adds a new file";
  }

  findAll() {
    return `This action returns all file`;
  }

  async generateStatisticsInformation(
    queryFileDto: QueryFileDto,
    interpreted: string,
  ) {
    try {
      const fileExcel = new ExcelFile();
      fileExcel.readExcel("../uploads/encuesta.xlsx");
      const { columns } = queryFileDto;

      columns.forEach((val) => {
        if (!fileExcel.getKeys().includes(val)) {
          throw new Error(
            "Las columnas ingresadas no se encuentran en el archivo",
          );
        }
      });

      if (interpreted == "yes") {
        try {
          const { content } = await this.openaiService.interpretarDatos(
            JSON.stringify(fileExcel.groupBy(columns)),
          );
          const interpretedData = fileExcel.groupBy(columns);
          interpretedData.description = content;
          return new HttpResponse().success(
            200,
            "Resultados de agrupación de datos e interpretacion con IA",
            interpretedData,
          );
        } catch (error) {
          throw new Error("Error a interpretar datos con IA");
        }
      }

      return new HttpResponse().success(
        200,
        "Resultados de agrupación de datos",
        fileExcel.groupBy(columns),
      );
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async loadFile() {
    try {
      const ruta = "../uploads/encuesta.xlsx";

      const fileExcel = new ExcelFile();

      fileExcel.readExcel(ruta);

      return new HttpResponse().success(
        200,
        "Archivo cargado correctamente",
        fileExcel.getAllDataFile(),
      );
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
