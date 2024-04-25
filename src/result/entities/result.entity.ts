import { 
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    Entity,
    UpdateDateColumn,
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
    status: number;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
