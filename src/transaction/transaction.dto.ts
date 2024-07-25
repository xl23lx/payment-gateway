import { Exclude, Expose } from 'class-transformer';
import { UserResponseDto } from 'src/user/user.dto';

@Exclude()
export class TransactionResponseDto{
    @Expose()
    id:string;

    @Expose()
    pos_id:string;

    created_at:Date;

    updated_at:Date;

    user:UserResponseDto;
}