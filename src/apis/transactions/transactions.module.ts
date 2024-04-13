import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';
import { AlchemyMultichainConfig } from 'src/alchemy/alchemy-multichain-config';

@Module({
  imports: [AlchemyMultichainConfig],  
  controllers: [TransactionController],
  providers: [TransactionService, AlchemyMultichainConfig],
})
export class TransactionsModule {}