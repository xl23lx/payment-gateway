import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>,
    ){}
    async register(user:UserData):Promise<User>{
        let duplicate=await this.usersRepository.findAndCountBy({username:user.username});
        if(duplicate){
            return null;
        }
        const salt=await bcrypt.genSalt();
        const hash=await bcrypt.hash(user.password,salt);
        user.password=hash;
        let userData = await this.usersRepository.save(user);
        delete userData.password;
        return userData;
    }
}