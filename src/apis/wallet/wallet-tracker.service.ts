import { Injectable } from '@nestjs/common';
import { WalletTrackerInterface } from './wallter-tracker.interface';
import { TokenBalancesResponse } from 'alchemy-sdk';
import { getTokenBalance } from 'src/alchemy/alchemy-multichain-validation';

@Injectable()
export class WalletService {
  async getTokenBalance(walletAddress: string, tokenAddress:string[]): Promise<TokenBalancesResponse> {
        const getBalanceResponse = getTokenBalance(walletAddress, tokenAddress)
        return getBalanceResponse  
  }

  async getTokenMetadata(tokenAddress: string): Promise<any> {
    // Implementation to get token metadata using alchemyWeb3Service
  }
}
