import { AlchemyMultichainClient } from './alchemy-multichain-client';
import { AssetTransfersResponse, Network, TokenBalancesResponse } from 'alchemy-sdk';

export class AlchemyMultichainConfig{
  defaultConfig = {
    apiKey: 'xo-rjJ9wSTW97wzuL2eNzn9v3lGKNH9J',
  };
  // Include optional setting overrides for specific networks.
  overrides = {
    // TODO: Replace with your API keys.
    [Network.ETH_MAINNET]: { apiKey: 'xo-rjJ9wSTW97wzuL2eNzn9v3lGKNH9J' },
    [Network.MATIC_MAINNET]: { apiKey: 'matic-api-key', maxRetries: 10 },
    [Network.ARB_MAINNET]: { apiKey: 'arb-api-key' }
  };
  alchemy = new AlchemyMultichainClient(this.defaultConfig, this.overrides);
  
  async verifyUserWalletAddress(walletAddress: string): Promise<boolean> {
    const ethResponse = await this.alchemy.verifyAddress(Network.ETH_MAINNET, walletAddress);
    return ethResponse.isValid;
  }
  
  async fetchUserWalletAddress(walletAddress: string): Promise<boolean> {
    const ethResponse = await this.alchemy.verifyAddress(Network.ETH_MAINNET, walletAddress);
    return ethResponse.isValid;
  }
  
  async getTokenBalance(walletAddress: string, tokenAddress: string[]): Promise<TokenBalancesResponse>{
    const ethResponse = await this.alchemy.getTokenBalance(Network.ETH_MAINNET, walletAddress, tokenAddress);
    return ethResponse
  }

  async getTransactionsFromAddress(walletAddress: string, page: number = 1, pageSize: number = 10): Promise<AssetTransfersResponse> {
    try {
      const ethResponse: AssetTransfersResponse = await this.alchemy.getTransactionsFromAddress(Network.ETH_MAINNET, walletAddress);
      
      // Calculate pagination indices
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
  
      // Slice the transactions array based on pagination indices
      const paginatedTransactions = ethResponse.transfers.slice(startIndex, endIndex);
  
      // Update the response object with paginated transactions
      const paginatedResponse: AssetTransfersResponse = {
        ...ethResponse,
        transfers: paginatedTransactions,
      };
  
      return paginatedResponse;
    } catch (error) {
      throw new Error(`Error fetching transactions: ${error.message}`);
    }
  }
  
}
