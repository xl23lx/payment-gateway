import { Injectable, NotAcceptableException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>,
    ){}
    async login(username:string,password:string):Promise<any>{
        const user = await this.usersRepository.findOneBy({username});
        if (!user) {
            throw new NotAcceptableException('Login failed');
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if (user && passwordValid) {
            delete user.password
          return user;
        }
        return null;
    }
}