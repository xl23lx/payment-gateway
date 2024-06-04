import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    first_name: string;
  
    @Column()
    last_name: string;

    @Column({unique:true})
    username:string;

    @Column()
    password:string;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date
  
    @Column({ default: true })
    is_active: boolean;

    @OneToMany(()=>Transaction,(transaction)=>transaction.user)
    transactions:Transaction[]
}