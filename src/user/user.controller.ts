import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request, Response } from 'express';

@Controller('user')
export class UserController{
    constructor(
        private readonly userService: UserService
    ) {}
    @Post('/register')
    @HttpCode(201)
    async register(@Body() userData:UserData, @Res() response:Response):Promise<any>{
        let user = await this.userService.register(userData);
        if(!user){
            response.status(HttpStatus.CONFLICT).send({message:"Username already exist!"});
        }
        return response.status(HttpStatus.CREATED).send(user);
    }
}