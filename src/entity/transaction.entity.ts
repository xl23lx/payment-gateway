import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()

export class Transaction{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    pos_id:string;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>User,(user)=>user.transactions)
    user:User   
}