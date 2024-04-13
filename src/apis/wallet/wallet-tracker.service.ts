import { Injectable, Logger } from '@nestjs/common';
import { WalletTrackerInterface } from './model/wallter-tracker.interface';
import { Alchemy, OwnedNftsResponse, TokenBalancesResponse } from 'alchemy-sdk';
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

  async verifyWalletWithSignature(signature: string, message: string): Promise<boolean> {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { ethers } = require('ethers');
    const { hashMessage } = require('@ethersproject/hash');
    const { Network } = require('alchemy-sdk');

    const settings = {
      apiKey: API_URL,
      Network: Network.ETH_SEPOLIA,
    };

    const alchemy = new Alchemy(settings);
    const ethersAlchemyProvider = alchemy.config.getProvider();

    const walletInst = new ethers.Wallet(PRIVATE_KEY, ethersAlchemyProvider);
    const signedMessage = await walletInst.signMessage(message);

    try {
      const verifySigner = ethers.recoverAddress(hashMessage(message), signature);
      Logger.log('The signer was: ' + verifySigner);
      return verifySigner;

    } catch (err) {
      Logger.log('Something went wrong while verifying your message signature: ' + err);
    }
  }

}
