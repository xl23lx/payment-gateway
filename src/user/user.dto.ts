import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { Transaction } from 'src/entity/transaction.entity';

@Exclude()
export class UserResponseDto{
    @Expose()
    @IsString()
    id:string;

    @Expose()
    @IsString()
    first_name:string;

    @Expose()
    @IsString()
    last_name:string;

    @Expose()
    @IsString()
    username:string;

    password:string;

    created_at:Date;

    updated_at:Date;

    @Expose()
    @IsBoolean()
    is_active:boolean;

    is_admin:boolean;

    transactions:Transaction[]
    
}