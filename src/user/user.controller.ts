import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from 'express';
import { AuthenticatedGuard } from "../auth/autheticated.guard";

@Controller('user')
export class UserController{
    constructor(
        private readonly userService: UserService
    ) {}
    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() userData:UserData):Promise<User>{
        return await this.userService.register(userData);
    }
    @UseGuards(AuthenticatedGuard)
    @Get('/:id')
    async getUser(@Param() params:any):Promise<User>{
        return await this.userService.getUser(params.id);
    }
}