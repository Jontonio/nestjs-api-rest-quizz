import { RolePermission } from "src/role_permission/entities/role_permission.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn("increment")
  id_permission: number;

  @Column({ type: "varchar", length: 50 })
  @Index({ unique: true })
  name_permission: string;

  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

   // Relacionar la tabla role_permissions
   @OneToMany(() => RolePermission, (r: RolePermission) => r.permission)
   role_permissions: RolePermission[];
}
