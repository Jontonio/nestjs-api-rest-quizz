import { Permission } from "src/permission/entities/permission.entity";
import { Role } from "src/role/entities/role.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn("increment")
  id_role_permision: number;

  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionar con Rol
  @ManyToOne(
    () => Role,
    (r: Role) => r.role_permissions
  )
  @JoinColumn({ name: "role_id" })
  role: Role;

   // Relacionar con permission
   @ManyToOne(
    () => Permission,
    (r: Permission) => r.role_permissions
  )
  @JoinColumn({ name: "permission_id" })
  permission: Role;
}
