import { BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Transaction } from "src/entity/transaction.entity";
import { Repository } from "typeorm";
import { TransactionResponseDto } from "./transaction.dto";
import { validate } from "class-validator";
import { UserResponseDto } from "src/user/user.dto";

@Injectable()
export class TransactionService{
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository:Repository<Transaction>,
    ){}

    async addTransaction(transaction:TransactionData):Promise<Transaction>{
        return this.transactionRepository.save(transaction)
    }

    async getTransaction(transactionId:string):Promise<Transaction | undefined>{
        let transaction = await this.transactionRepository.findOne({
            relations:{
                user:true
            },
            where:{
                id:transactionId
            }
        });

        if(!transaction){
            throw new NotFoundException('Transaction not found');
        }

        const transactionResponseDto=plainToClass(TransactionResponseDto,transaction);
        const userResponseDto=plainToClass(UserResponseDto,transaction.user);
        transactionResponseDto.user=userResponseDto;

        const errors=await validate(transactionResponseDto);

        if(errors.length){
            throw new BadGatewayException('Invalid Transaction');
        }

        return transactionResponseDto;
    }
}