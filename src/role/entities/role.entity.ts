import { RolePermission } from "src/role_permission/entities/role_permission.entity";
import { User } from "src/user/entities/user.entity";
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
export class Role {
  @PrimaryGeneratedColumn("increment")
  id_role: number;

  @Column({ type: "varchar", length: 50 })
  @Index({ unique: true })
  name_role: string;

  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionar la tabla user
  @OneToMany(() => User, (u: User) => u.role)
  users: User[];

  // Relacionar la tabla role_permissions
  @OneToMany(() => RolePermission, (r: RolePermission) => r.role)
  role_permissions: RolePermission[];

}
