import { CategoryInstitution } from "src/category_institution/entities/category_institution.entity";
import { File } from "src/file/entities/file.entity";
import { InstitutionStaff } from "src/institution_staff/entities/institution_staff.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionar con la tabla categoria
  @ManyToOne(
    () => CategoryInstitution,
    (ci: CategoryInstitution) => ci.institutions,
    {
      nullable: false,
      onUpdate: "CASCADE",
    },
  )
  @JoinColumn({
    name: "id_category_institution",
    referencedColumnName: "id_category_institution",
  })
  category_institution: CategoryInstitution;

  // Relacionar la tabla institution
  @OneToMany(() => File, (f: File) => f.institution)
  files: File[];

  // Relacionar la tabla institution_staff
  @OneToMany(() => InstitutionStaff, (is: InstitutionStaff) => is.institution)
  institution_staffs: InstitutionStaff[];
}
