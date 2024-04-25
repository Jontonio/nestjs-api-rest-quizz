import { 
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    Entity,
    Index,
    UpdateDateColumn,
 } from "typeorm";

 @Entity()
export class CategoryInstitution {
    @PrimaryGeneratedColumn("increment")
  id_category_institution: number;

  @Column({ type: "varchar", length: 50 })
  @Index({ unique: true })
  name_category_institution: string;

  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


}
