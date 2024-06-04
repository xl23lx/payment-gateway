import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "src/entity/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionService{
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository:Repository<Transaction>,
    ){}

    async addTransaction(transaction:TransactionData):Promise<Transaction>{
        return this.transactionRepository.save(transaction)
    }

    async getTransaction(transactionId:string):Promise<Transaction>{
        return await this.transactionRepository.findOne({
            where:{
                id:transactionId
            }
        });
    }
}