import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateCategoryInstitutionDto } from "./dto/create-category_institution.dto";
import { UpdateCategoryInstitutionDto } from "./dto/update-category_institution.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryInstitution } from "./entities/category_institution.entity";
import { Repository } from "typeorm";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/page.dto";
import { HttpResponse } from "src/class/HttpResponse";

@Injectable()
export class CategoryInstitutionService {
  constructor(
    @InjectRepository(CategoryInstitution)
    public categoryInstitutionModel: Repository<CategoryInstitution>,
  ) {}
  async create(createCategoryInstitutionDto: CreateCategoryInstitutionDto) {
    try {
      const categoryInstitution = await this.categoryInstitutionModel.save(
        createCategoryInstitutionDto,
      );
      return new HttpResponse().success(
        201,
        "Categoria de institucion creado correctamente",
        categoryInstitution,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al crear la categoria de institucion",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      // Desestructurar el objeto pageOptionsDto
      const { skip, order, take } = pageOptionsDto;
      // Lista los tipos de staffs
      const categoryInstitutions = await this.categoryInstitutionModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { id_category_institution: order },
      });
      // Contar la cantidad de registros
      const itemCount = await this.categoryInstitutionModel.countBy({
        status: true,
      });
      // Instanciar el objeto para page meta
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      // Instanciar page dto con la data y page meta
      const data = new PageDto(categoryInstitutions, pageMetaDto);
      // Retornar la respuesta
      return new HttpResponse().success(
        201,
        "Lista de categorias de institucion",
        data,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener las categorias de institucion",
      );
    }
  }

  async findOne(id: number) {
    try {
      const categoryInstitution = await this.categoryInstitutionModel.findBy({
        id_category_institution: id,
      });

      return new HttpResponse().success(
        201,
        "categoria de institucion",
        categoryInstitution,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener la categoria de institucion",
      );
    }
  }

  async update(
    id_category_institution: number,
    data: UpdateCategoryInstitutionDto,
  ) {
    try {
      const categoryInstitution = await this.categoryInstitutionModel.update(
        id_category_institution,
        data,
      );

      return new HttpResponse().success(
        201,
        "Categoria de institucion actualizado correctamente",
        categoryInstitution,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar la categoria de institucion",
      );
    }
  }

  async remove(id_category_institution: number) {
    try {
      const categoryInstitution = await this.categoryInstitutionModel.update(
        id_category_institution,
        {
          status: false,
        },
      );

      return new HttpResponse().success(
        201,
        "Categoria de la institucion eliminado correctamente",
        categoryInstitution,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar la categoria de la institucion",
      );
    }
  }
}
