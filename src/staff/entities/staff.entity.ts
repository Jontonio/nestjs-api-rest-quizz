import { 
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
 } from "typeorm";

@Entity()
export class Staff {
    @PrimaryColumn ({type: "varchar", length: 8})
    id_card_staff: string;

    @Column({type: "varchar", length: 20})
    name_staff: string;

    @Column({type: "varchar", length: 20})
    first_name_staff: string;

    @Column({type: "varchar", length: 20})
    last_name_staff: string;

    @Column({ default: true })
    status: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}


