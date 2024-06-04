import { Module } from "@nestjs/common";
import { Transaction } from "src/entity/transaction.entity";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[
        TypeOrmModule.forFeature([Transaction]),
    ],
    controllers:[TransactionController],
    providers:[TransactionService],
    exports:[TransactionService],
})

export class TransactionModule {}