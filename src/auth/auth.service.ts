import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>,
        private jwtService:JwtService
    ){}
    async login(login:Login):Promise<LoginResponse>{
        const userData=await this.usersRepository.findOneBy({username:login.username})
        const userObject={...userData}
        if(userData){
            const isMatch=await bcrypt.compare(login.password,userData.password);
            if(isMatch){
                delete userObject.password;
                return{
                    message:"Login success!",
                    access_token:await this.jwtService.signAsync(userObject)
                }
            }
        }
        return{
            message:"Login failed!"
        }
    }
    async register(user:User):Promise<User>{
        const salt=await bcrypt.genSalt();
        const hash=await bcrypt.hash(user.password,salt);
        user.password=hash;
        let userData = await this.usersRepository.save(user);
        delete userData.password;
        return userData;
    }

    async validateJwt(token:string):Promise<boolean>{
        return false;
    }
}