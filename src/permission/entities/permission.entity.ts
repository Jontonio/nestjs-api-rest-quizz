import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
}
