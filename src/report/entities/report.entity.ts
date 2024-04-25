import { Result } from "src/result/entities/result.entity";
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
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
}
