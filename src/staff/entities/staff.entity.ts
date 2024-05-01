import { InstitutionStaff } from "src/institution_staff/entities/institution_staff.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";

@Entity()
export class Staff {
  @PrimaryColumn({ type: "varchar", length: 8 })
  @Index({ unique: true })
  id_card_staff: string;

  @Column({ type: "varchar", length: 20 })
  name_staff: string;

  @Column({ type: "varchar", length: 20 })
  first_name_staff: string;

  @Column({ type: "varchar", length: 20 })
  last_name_staff: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionar la tabla institution_staff
  @OneToMany(() => InstitutionStaff, (is: InstitutionStaff) => is.staff)
  institutionstaffs: InstitutionStaff[];
}
