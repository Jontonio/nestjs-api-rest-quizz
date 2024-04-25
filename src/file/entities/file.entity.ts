import {
  Column,
  CreateDateColumn,
  Entity,
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
}
