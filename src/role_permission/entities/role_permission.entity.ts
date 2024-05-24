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
  id_role_permission: number;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionar con Rol
  @ManyToOne(
    () => Role,
    (r: Role) => r.role_permissions, {
    nullable: false,
    onUpdate: "CASCADE",
    }
  )
  @JoinColumn({ name: "id_role", referencedColumnName: "id_role"  })
  role: Role;

   // Relacionar con permission
   @ManyToOne(
    () => Permission,
    (r: Permission) => r.role_permissions, {
      nullable: false,
      onUpdate: "CASCADE",
      }
  )
  @JoinColumn({ name: "id_permission", referencedColumnName: "id_permission" })
  permission: Permission;
}
