import { Report } from "src/report/entities/report.entity";
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Result {
  @PrimaryGeneratedColumn("increment")
  id_result: number;

  @Column({ type: "varchar", length: 50 })
  result_item: string;

  @Column({ type: "int" })
  result_value: number;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacion con resultado
  @ManyToOne(() => Report, (r: Report) => r.results, {
    nullable: false,
  })
  @JoinColumn({ name: "id_report", referencedColumnName: "id_report" })
  report: Report;
}
