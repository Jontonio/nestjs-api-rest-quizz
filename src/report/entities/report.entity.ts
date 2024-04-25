import { 
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    Entity,
    UpdateDateColumn,
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
}
