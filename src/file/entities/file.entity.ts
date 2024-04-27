import { Institution } from "src/institution/entities/institution.entity";
import { Report } from "src/report/entities/report.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn("increment")
  id_file: number;

  @Column({ type: "varchar", length: 5 })
  file_extension: string;

  @Column({ type: "varchar" })
  file_url: string;

  @Column({ type: "varchar", length: 50 })
  file_name: string;

  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relación report
  @OneToMany(() => Report, (r: Report) => r.file)
  reports: Report[];

  // Relacion con Institution
  @ManyToOne(
    () => Institution,
    (ci: Institution) => ci.files,
  )
  @JoinColumn({ name: "institution_id" })
  institution: Institution;

}
