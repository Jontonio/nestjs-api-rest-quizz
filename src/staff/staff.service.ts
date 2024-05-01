import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { Staff } from "./entities/staff.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpResponse } from "src/class/HttpResponse";
import { PageOptionsDto } from "src/helpers/PageOptionsDto.dto";
import { PageMetaDto } from "src/helpers/PageMetaDto";
import { PageDto } from "src/helpers/page.dto";

@Injectable()
export class StaffService {
  constructor(@InjectRepository(Staff) public staffModel: Repository<Staff>) {}

  async create(createStaffDto: CreateStaffDto) {
    try {
      const staff = await this.staffModel.save(createStaffDto);
      return new HttpResponse().success(
        201,
        "Personal creado correctamente",
        staff,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al crear el personal",
      );
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const { skip, order, take } = pageOptionsDto;
      const staffs = await this.staffModel.find({
        where: { status: true },
        skip: skip,
        take: take,
        order: { name_staff: order },
      });

      const itemCount = await this.staffModel.count({
        where: { status: true },
      });

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      const data = new PageDto(staffs, pageMetaDto);

      return new HttpResponse().success(201, "Lista de personal", data);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener lista personal",
      );
    }
  }

  async findOne(id_card_staff: string) {
    try {
      const staff = await this.staffModel.findOneBy({ id_card_staff });
      return new HttpResponse().success(200, "Obtención de un personal", staff);
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener el personal",
      );
    }
  }

  async update(id_card_staff: string, updateStaffDto: UpdateStaffDto) {
    try {
      const staff = await this.staffModel.update(id_card_staff, updateStaffDto);

      return new HttpResponse().success(
        201,
        "Personal actualizado correctamente",
        staff,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar el personal",
      );
    }
  }

  async remove(id_card_staff: number) {
    try {
      const staff = await this.staffModel.update(id_card_staff, {
        status: false,
      });

      return new HttpResponse().success(
        201,
        "Personal eliminado correctamente",
        staff,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al eliminar personal",
      );
    }
  }
}
