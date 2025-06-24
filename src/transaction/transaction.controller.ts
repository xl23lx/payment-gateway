import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Request, UseGuards } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { Transaction } from "src/entity/transaction.entity";
import { AuthenticatedGuard } from "src/auth/autheticated.guard";
import { User } from "src/entity/user.entity";

@Controller('transaction')
export class TransactionController{
    constructor(
        private readonly transactionService: TransactionService
    ) {}

    @UseGuards(AuthenticatedGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addTransaction(@Body() transactionData:TransactionData,@Req() req):Promise<Transaction>{
        transactionData.user=req.user;
        return this.transactionService.addTransaction(transactionData);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getAllTransaction(@Request() req:any):Promise<Transaction[]>{
        let user:User=req.user;
        return this.transactionService.getAllTransaction(user);
    }
    @UseGuards(AuthenticatedGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getTransaction(@Param('id') id:string):Promise<Transaction>{
        return this.transactionService.getTransaction(id);
    }
}