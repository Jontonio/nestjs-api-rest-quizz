import { TypeStaff } from "src/type-staff/entities/type-staff.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { Institution } from "src/institution/entities/institution.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,

} from "typeorm";

@Entity()
export class InstitutionStaff {
  @PrimaryGeneratedColumn("increment")
  id_institution_staff: number;

  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

   // Relacionar con la tabla Type_staff
   @ManyToOne(
    () => TypeStaff,
    (ts: TypeStaff) => ts.institutionstaffs,
  )
  @JoinColumn({ name: "type_staff_id" })
  type_staff: TypeStaff;

  // Relacionar con la tabla staff
  @ManyToOne(
    () => Staff,
    (ts: Staff) => ts.institutionstaffs,
  )
  @JoinColumn({ name: "card_staff_id" })
  staff: Staff;

   // Relacionar con la institution
   @ManyToOne(
    () => Institution,
    (ie: Institution) => ie.institution_staffs,
  )
  @JoinColumn({ name: "institution_cod_mod" })
  institution: Institution;

}
