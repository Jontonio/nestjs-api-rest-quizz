import { Result } from "src/result/entities/result.entity";
import { File } from "src/file/entities/file.entity";
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn("increment")
  id_report: number;

  @Column({ type: "varchar", length: 150 })
  report_title: string;

  @Column({ type: "varchar", length: 300 })
  report_description: string;

  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionar la tabla reporte
  @OneToMany(() => Result, (r: Result) => r.report)
  results: Result[];
 

  // Relacion con file
 @ManyToOne(
 () => File,
 (f: File) => f.reports,
 )
  @JoinColumn({ name: "file_id" })
 file: File;
}
