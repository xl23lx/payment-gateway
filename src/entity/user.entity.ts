import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;
  
    @Column()
    first_name: string;
  
    @Column()
    last_name: string;

    @Column()
    username:string;

    @Column()
    password:string;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date
  
    @Column({ default: true })
    is_active: boolean;
}