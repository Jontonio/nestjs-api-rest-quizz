import { IsNotEmpty } from "class-validator";
import { Permission } from "src/permission/entities/permission.entity";
import { Role } from "src/role/entities/role.entity";

export class CreateRolePermissionDto {
   
      @IsNotEmpty({ message: "El id del rol a relacionar es requerido" })
      role: Role;
    
      @IsNotEmpty({ message: "El id del permiso a relacionar es requerido" })
      permission: Permission;
    
}
