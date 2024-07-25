import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, Session, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthenticatedGuard } from "../auth/autheticated.guard";

@Controller('user')
export class UserController{
    constructor(
        private readonly userService: UserService
    ) {}
    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() userData:UserData):Promise<User>{
        return this.userService.register(userData);
    }
    @UseGuards(AuthenticatedGuard)
    @Get('/:id')
    async getUser(@Param() params:any):Promise<User>{
        return this.userService.getUser(params.id);
    }
}