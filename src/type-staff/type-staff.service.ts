import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateTypeStaffDto } from "./dto/create-type-staff.dto";
import { UpdateTypeStaffDto } from "./dto/update-type-staff.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeStaff } from "./entities/type-staff.entity";
import { Repository } from "typeorm";

@Injectable()
export class TypeStaffService {
  constructor(
    @InjectRepository(TypeStaff) public typeStaffModel: Repository<TypeStaff>,
  ) {}
  async create(createTypeStaffDto: CreateTypeStaffDto) {
    try {
      const typeStaff = await this.typeStaffModel.save(createTypeStaffDto);
      return {
        msg: "Personal creado correctamente",
        status: 201,
        data: typeStaff,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Ocurrio un error al crear el personal",
      );
    }
  }

  async findAll() {
    try {
      const typeStaffs = await this.typeStaffModel.find();
      return {
        msg: "Lista de tipos de personal",
        status: 200,
        data: typeStaffs,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener los tipos de personal",
      );
    }
  }

  async findOne(id: number) {
    try {
      const typeStaff = await this.typeStaffModel.findBy({
        id_type_staff: id,
      });
      return {
        msg: "Personal con id " + id,
        status: 200,
        data: typeStaff,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al obtener el personal",
      );
    }
  }

  async update(id_type_staff: number, data: UpdateTypeStaffDto) {
    try {
      const typeStaff = await this.typeStaffModel.update(id_type_staff, data);
      return {
        msg: "Personal actualizado correctamente",
        status: 200,
        data: typeStaff,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        "Ocurrio un error al actualizar el personal",
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} typeStaff`;
  }
}
