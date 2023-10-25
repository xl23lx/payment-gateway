import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('/login')
    login(): string {
        return this.authService.login();
    }
    @Post('/register')
    register(@Req() request:Request):Promise<User>{
        return this.authService.register(request.body)
    }
}