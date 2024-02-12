import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthenticatedGuard } from './autheticated.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @HttpCode(200)
    async login(@Req() req:Request): Promise<any> {
        return {
            user: req.user,
            msg: 'User logged in'
        };
    }
    @Get('/logout')
    logout(@Req() req): any {
    req.session.destroy();
    return { msg: 'User logged out' }
    }
}