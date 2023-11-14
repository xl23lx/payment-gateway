import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
        ) {}

    @Post('/login')
    @HttpCode(200)
    async login(@Req() request:Request, @Res() response:Response): Promise<any> {
        let data=await this.authService.login(request.body);
        if(data.access_token){
            response.appendHeader('x-access-token',data.access_token);
            delete data.access_token;
            return response.status(HttpStatus.OK).send(data);
        }
        return response.status(HttpStatus.UNAUTHORIZED).send(data);
    }
    @Post('/register')
    @HttpCode(201)
    async register(@Req() request:Request):Promise<User>{
        return this.authService.register(request.body)
    }
    @UseGuards(AuthGuard)
    @Get('/profile')
    async profile():Promise<object>{
        return{
            data:'data'
        }
    }
}