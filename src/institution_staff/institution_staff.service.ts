import { Injectable } from "@nestjs/common";
import { CreateInstitutionStaffDto } from "./dto/create-institution_staff.dto";
import { UpdateInstitutionStaffDto } from "./dto/update-institution_staff.dto";

@Injectable()
export class InstitutionStaffService {
  create(createInstitutionStaffDto: CreateInstitutionStaffDto) {
    return "This action adds a new institutionStaff";
  }

  findAll() {
    return `This action returns all institutionStaff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} institutionStaff`;
  }

  update(id: number, updateInstitutionStaffDto: UpdateInstitutionStaffDto) {
    return `This action updates a #${id} institutionStaff`;
  }

  remove(id: number) {
    return `This action removes a #${id} institutionStaff`;
  }
}
