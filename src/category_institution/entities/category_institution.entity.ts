import { Institution } from "src/institution/entities/institution.entity";
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  Index,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class CategoryInstitution {
  @PrimaryGeneratedColumn("increment")
  id_category_institution: number;

  @Column({ type: "varchar", length: 50 })
  @Index({ unique: true })
  name_category_institution: string;

  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionar la tabla institution
  @OneToMany(() => Institution, (ie: Institution) => ie.category_institution)
  institutions: Institution[];
}
