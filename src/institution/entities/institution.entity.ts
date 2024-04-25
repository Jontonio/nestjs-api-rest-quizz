import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Institution {
  @PrimaryColumn({ type: "varchar", length: 15 })
  cod_mod_institution: string;

  @Column({ type: "varchar", length: 100 })
  name_institution: string;

  @Column({ type: "varchar", length: 30 })
  level_modality: string;

  @Column({ type: "varchar", length: 100 })
  address_institution: string;

  @Column({ type: "varchar", length: 30 })
  managment_dependency_institution: string;

  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
