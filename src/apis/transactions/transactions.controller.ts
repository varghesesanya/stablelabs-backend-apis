/*
 *Transaction Controller - Rest Api Exposed for all Transaction defined end points 
*/
import { Controller, Post, Body, Res, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transactions.service';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionControler {

  constructor(
    private transactionService: TransactionService
  ) { }

  @Get(':address/transaction-history')
  async getTransactionList(@Res() response, @Param('address') address : string): Promise<any[]> {
    const listOfTransactions: any[] = await this.transactionService.getTransactionsFromAddress(`${address}`);
    return listOfTransactions;
  }
}
