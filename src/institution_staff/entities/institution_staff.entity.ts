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
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

   // Relacionar con la tabla Type_staff
   @ManyToOne(
    () => TypeStaff,
    (ts: TypeStaff) => ts.institutionstaffs,{
      nullable: false,
      onUpdate: "CASCADE",
    }
  )
  @JoinColumn({ name: "id_type_staff" , referencedColumnName: "id_type_staff" })
  type_staff: TypeStaff;

  // Relacionar con la tabla staff
  @ManyToOne(
    () => Staff,
    (ts: Staff) => ts.institutionstaffs,{
      nullable: false,
      onUpdate: "CASCADE",
    }
  )
  @JoinColumn({ name: "id_card_staff" , referencedColumnName: "id_card_staff"})
  staff: Staff;

   // Relacionar con la institution
  @ManyToOne(
    () => Institution,
    (ie: Institution) => ie.institution_staffs,{
      nullable: false,
      onUpdate: "CASCADE",
    }
  )
  @JoinColumn({ name: "cod_mod_institution" , referencedColumnName: "cod_mod_institution"})
  institution: Institution;

}
