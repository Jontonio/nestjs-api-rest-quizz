import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
}
