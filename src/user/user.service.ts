import { BadGatewayException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import { UserResponseDto } from "./user.dto";
import { validate } from "class-validator";
@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>,
    ){}
    async register(user:UserData):Promise<User>{
        let duplicate=await this.usersRepository.findOneBy({username:user.username});
        if(duplicate){
            throw new HttpException({
                status:HttpStatus.CONFLICT,
                errors:{
                    message:'Username already exist'
                },
            },
            HttpStatus.CONFLICT,
            );
        }
        const salt=await bcrypt.genSalt();
        const hash=await bcrypt.hash(user.password,salt);
        user.password=hash;
        let userData = await this.usersRepository.save(user);
        delete userData.password;
        return userData;
    }
    async getUser(id:string):Promise<User | undefined>{
        let user=await this.usersRepository.findOneBy({id});
        if(!user){
            throw new HttpException({
                status:HttpStatus.NOT_FOUND,
                errors:{
                    message:'User does not exist'
                },
            },
            HttpStatus.NOT_FOUND,
            );
        }
        const userResponseDto=plainToClass(UserResponseDto,user);

        const errors=await validate(userResponseDto);

        if(errors.length){
            throw new BadGatewayException('Invalid User');
        }
        
        return userResponseDto;
    }
}