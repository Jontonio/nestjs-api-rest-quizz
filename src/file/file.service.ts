import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from "@nestjs/common";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { ExcelFile } from "src/class/ExcelFile";
import { OpenIaService } from "src/open-ia/open-ia.service";
import { HttpResponse } from "src/class/HttpResponse";
import { QueryFileDto } from "./dto/query-file.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";
import { Repository } from "typeorm";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/page.dto";
import * as fs from "fs-extra";
import { createReadStream } from "fs";
import { join } from "path";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    public fileModel: Repository<File>,
    private readonly openaiService: OpenIaService,
  ) {}

  async create(createFileDto: CreateFileDto, _file: Express.Multer.File) {
    try {
      if (!_file) {
        throw new HttpException(
          `El archivo es requerido`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const allowedMimes = [
        "application/vnd.ms-excel", // Para archivos .xls
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (!allowedMimes.includes(_file.mimetype)) {
        await fs.unlink(_file.path);
        throw new HttpException(
          `Solo se permite archivo de tipo (XLSX)`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const in_mb = _file.size / 1000000;

      if (in_mb > 2) {
        await fs.unlink(_file.path);
        throw new HttpException(
          `Tamaño de archivo permitido mínimo 2 MB`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const file_extension = _file.originalname.split(".").pop();
      const file_name = _file.filename;
      const file_url = _file.mimetype;
      const newDto = { ...createFileDto, file_extension, file_name, file_url };
      const file = await this.fileModel.save(newDto);
      return new HttpResponse().success(
        201,
        "Archivo registrado correctamente",
        file,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const { skip, order, take } = pageOptionsDto;
      const files = await this.fileModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { createdAt: order },
      });

      const itemCount = await this.fileModel.count({
        where: { status: true },
      });

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      const data = new PageDto(files, pageMetaDto);

      return new HttpResponse().success(201, "Lista de archivos", data);
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener lista de archivos",
      );
    }
  }

  async generateStatisticsInformation(
    queryFileDto: QueryFileDto,
    interpreted: string,
  ) {
    try {
      const fileExcel = new ExcelFile();
      //TODO: pasar el nombre del archivo
      fileExcel.readExcel("/uploads/9499f580-aaaa-48d0-a05c-bed47b42356a.xlsx");
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
      //TODO: pasar el nombre del archivo
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

  async findOne(id_file: number) {
    try {
      const file = await this.fileModel.findOne({
        where: { id_file, status: true },
      });
      return new HttpResponse().success(200, "Obtención del archivo", file);
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener archivo",
      );
    }
  }

  async update(id_file: number, updateFileDto: UpdateFileDto) {
    try {
      const file = await this.fileModel.update(id_file, updateFileDto);

      return new HttpResponse().success(
        200,
        "Archivo actualizado correctamente",
        file,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar archivo",
      );
    }
  }

  async remove(id_file: number) {
    try {
      const institution = await this.fileModel.update(id_file, {
        status: false,
      });

      return new HttpResponse().success(
        201,
        "Archivo eliminado correctamente",
        institution,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar archivo",
      );
    }
  }
}
