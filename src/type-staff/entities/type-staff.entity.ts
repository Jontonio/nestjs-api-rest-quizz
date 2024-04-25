import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class TypeStaff {
  @PrimaryGeneratedColumn("increment")
  id_type_staff: number;

  @Column({ type: "varchar", length: 50 })
  @Index({ unique: true })
  name_type_staff: string;

  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
