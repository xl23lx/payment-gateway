import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>
    ){}
    login():string{
        return 'Get login!'
    }
    register(user:User):Promise<User>{
        return this.usersRepository.save(user);
    }
}