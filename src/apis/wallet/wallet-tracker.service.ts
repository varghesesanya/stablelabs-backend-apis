import { Injectable } from '@nestjs/common';
import { WalletTrackerInterface } from './wallter-tracker.interface';
import { TokenBalancesResponse } from 'alchemy-sdk';
import { AlchemyMultichainConfig } from 'src/alchemy/alchemy-multichain-config';

@Injectable()
export class WalletService {

  constructor(
    private alchemyMultiChainConfig :AlchemyMultichainConfig 
  ){}
  async getTokenBalance(walletAddress: string, tokenAddress:string[]): Promise<TokenBalancesResponse> {
        const getBalanceResponse = this.alchemyMultiChainConfig.getTokenBalance(walletAddress, tokenAddress)
        return getBalanceResponse  
  }

  async getTokenMetadata(tokenAddress: string): Promise<any> {
    // Implementation to get token metadata using alchemyWeb3Service
  }
}
