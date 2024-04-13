import { Logger } from '@nestjs/common';
import { AlchemyMultichainClient } from './alchemy-multichain-client';
import { AssetTransfersResponse, Network, OwnedNftsResponse, TokenBalancesResponse } from 'alchemy-sdk';

export class AlchemyMultichainConfig{

  private readonly logger = new Logger(AlchemyMultichainConfig.name);

  defaultConfig = {
    apiKey: 'xo-rjJ9wSTW97wzuL2eNzn9v3lGKNH9J',
  };
  // Include optional setting overrides for specific networks.
  overrides = {
    // TODO: Replace with your API keys.
    [Network.ETH_MAINNET]: { apiKey: 'xo-rjJ9wSTW97wzuL2eNzn9v3lGKNH9J' },
    [Network.MATIC_MUMBAI]: { apiKey: 'matic-api-key', maxRetries: 10 },
    [Network.ETH_SEPOLIA]: { apiKey: 'eth-api-key' },
    [Network.ARB_SEPOLIA]: { apiKey: 'arb-api-key' },
  };
  alchemy = new AlchemyMultichainClient(this.defaultConfig, this.overrides);
  
  async verifyUserWalletAddress(walletAddress: string): Promise<boolean> {
    this.logger.log("In AlchemyMultiChainConfig, verifying wallet address")
    const ethResponse = await this.alchemy.verifyAddress(Network.ETH_MAINNET, walletAddress);
    return ethResponse.isValid;
  }
  
  async fetchUserWalletAddress(walletAddress: string): Promise<boolean> {
    this.logger.log("In AlchemyMultiChainConfig, fetching wallet address")
    const ethResponse = await this.alchemy.verifyAddress(Network.ETH_MAINNET, walletAddress);
    return ethResponse.isValid;
  }
  
  async getTokenBalance(walletAddress: string, tokenAddress: string[]): Promise<TokenBalancesResponse>{
    this.logger.log("In AlchemyMultiChainConfig, get token balance")
    const ethResponse = await this.alchemy.getTokenBalance(Network.ETH_MAINNET, walletAddress, tokenAddress);
    return ethResponse
  }

  async getTransactionsFromAddress(walletAddress: string, page: number = 1, pageSize: number = 10): Promise<AssetTransfersResponse> {
    try {
      this.logger.log("In AlchemyMultiChainConfig, get Transactions From an Address")
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

  async getNftsForOwner(walletAddress: string): Promise<OwnedNftsResponse>{
    const ethResponse = await this.alchemy.getNFTForOwners(Network.ETH_MAINNET, walletAddress);
    return ethResponse
  }

  
}
