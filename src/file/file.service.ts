import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { ExcelFile } from "src/class/ExcelFile";
import { OpenIaService } from "src/open-ia/open-ia.service";
import { HttpResponse } from "src/class/HttpResponse";
import { QueryFileDto, QueryGradeSectionFileDto } from "./dto/query-file.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";
import { Repository } from "typeorm";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/Page.dto";
import * as fs from "fs-extra";

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
    id_file: number,
    queryFileDto: QueryFileDto,
    interpreted: string,
  ) {
    try {
      const file = await this.fileModel.findOne({
        where: { id_file },
      });

      const fileExcel = new ExcelFile();
      const ruta = `../uploads/${file.file_name}`;
      fileExcel.readExcel(ruta);

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

  async loadFile(id_file: number) {
    try {
      const file = await this.fileModel.findOne({
        where: { id_file },
      });
      const ruta = `../uploads/${file.file_name}`;
      const fileExcel = new ExcelFile();
      fileExcel.readExcel(ruta);
      return new HttpResponse().success(
        200,
        "Archivo cargado correctamente",
        fileExcel.getKeys(),
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

  async resumeSecctionGrade(id_file: number) {
    try {
      const file = await this.fileModel.findOne({
        where: { id_file, status: true },
      });

      const fileExcel = new ExcelFile();
      const ruta = `../uploads/${file.file_name}`;
      fileExcel.readExcel(ruta);
      const grades = fileExcel.groupBy(["grado"]);
      const sections = fileExcel.groupBy(["sección"]);

      const data = { grades, sections };

      return new HttpResponse().success(200, "Obtención del archivo", data);
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener archivo",
      );
    }
  }

  async generateStaticsWithGradeSection(
    id_file: number,
    queryGradeSectionFile: QueryGradeSectionFileDto,
  ) {
    try {
      const file = await this.fileModel.findOne({
        where: { id_file, status: true },
      });

      const fileExcel = new ExcelFile();
      const ruta = `../uploads/${file.file_name}`;
      fileExcel.readExcel(ruta);

      const { columns, grade, section } = queryGradeSectionFile;

      if (!fileExcel.getColumn("grado").resut.includes(String(grade))) {
        throw new BadRequestException(
          "El grado a considerar no se encuentra en el archivo",
        );
      }

      if (
        !fileExcel
          .getColumn("sección")
          .resut.includes(String(section).toLowerCase())
      ) {
        throw new BadRequestException(
          "La sección a considerar no se encuentra en el archivo",
        );
      }

      columns.forEach((val) => {
        if (!fileExcel.getKeys().includes(val)) {
          throw new BadRequestException(
            "Las columnas ingresadas no se encuentran en el archivo",
          );
        }
      });

      fileExcel.filterGroupByGradeAndSection(String(grade), section);
      const data = [];

      for (let index = 0; index < columns.length; index++) {
        const item = fileExcel.groupBy([columns[index]]);
        data.push(item);
      }

      return new HttpResponse().success(200, "Obtención del archivo", data);
    } catch (e) {
      throw new HttpException(e.message, e.status);
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
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getFilesFromIE(cod_mod_institution: string) {
    try {
      const files = await this.fileModel.find({
        where: {
          institution: { cod_mod_institution },
          status: true,
        },
        select: ["id_file", "createdAt"],
        order: {
          id_file: "ASC",
        },
      });

      const acc = {};

      files.map((file) => {
        const year = new Date(file.createdAt).getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(file);
        return acc;
      });

      const yearFiles = [];

      Object.keys(acc).forEach((val) => {
        if (acc[val].length != 0) {
          acc[val].forEach((element, index) => {
            const data = {
              year: `${val}-${index + 1}`,
              id_file: element.id_file,
            };
            yearFiles.push(data);
          });
        }
      });
      return {
        statusCode: 201,
        message: "Lista de archivos de la institución",
        error: false,
        data: yearFiles,
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
