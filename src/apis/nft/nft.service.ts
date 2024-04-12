// transfer.service.ts
import { Injectable } from '@nestjs/common';
import { OwnedNftsResponse } from 'alchemy-sdk';
import { AlchemyMultichainConfig } from 'src/alchemy/alchemy-multichain-config';


@Injectable()
export class NFTService {
  constructor(private readonly alchemyMultiConfig: AlchemyMultichainConfig) {}

  async getNFTForOwners(walletAddress: string): Promise<OwnedNftsResponse> {
    try {
      const ethResponse = await this.alchemyMultiConfig.getNftsForOwner(walletAddress);
      return ethResponse;
    } catch (error) {
      throw new Error(`Error fetching nft details: ${error.message}`);
    }
  }
}
