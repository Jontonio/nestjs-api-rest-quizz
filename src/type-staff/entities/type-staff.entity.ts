import { InstitutionStaff } from "src/institution_staff/entities/institution_staff.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class TypeStaff {
  @PrimaryGeneratedColumn("increment")
  id_type_staff: number;

  @Column({ type: "varchar", length: 50 })
  @Index({ unique: true })
  name_type_staff: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionar la tabla institution_staff
  @OneToMany(() => InstitutionStaff, (is: InstitutionStaff) => is.type_staff)
  institutionstaffs: InstitutionStaff[];
}
