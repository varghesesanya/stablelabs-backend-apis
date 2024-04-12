// transfer.service.ts
import { Injectable } from '@nestjs/common';
import { AlchemyMultichainConfig } from 'src/alchemy/alchemy-multichain-config';


@Injectable()
export class TransactionService {
  constructor(private readonly alchemyMultiConfig: AlchemyMultichainConfig) {}

  async getTransactionsFromAddress(walletAddress: string): Promise<any[]> {
    try {
      const ethResponse = await this.alchemyMultiConfig.getTransactionsFromAddress(walletAddress);
      return ethResponse.transfers;
    } catch (error) {
      throw new Error(`Error fetching transactions: ${error.message}`);
    }
  }
}
