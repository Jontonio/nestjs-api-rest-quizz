import { Role } from "src/role/entities/role.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id_user: number;

  @Column({ type: "varchar", length: 100 })
  @Index({ unique: true })
  email: string;

  @Column({ type: "varchar", length: 10 })
  @Index({ unique: true })
  id_card: string;

  @Column({ type: "varchar", length: 45 })
  names: string;

  @Column({ type: "varchar", length: 50 })
  full_name: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar", nullable: true })
  remember_token: string;

  @Column({ default: true })
  is_active: number;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionar con Rol
  @ManyToOne(() => Role, (r: Role) => r.role_permissions, {
    nullable: false,
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_role", referencedColumnName: "id_role" })
  role: Role;
}
