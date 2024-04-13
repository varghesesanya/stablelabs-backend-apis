import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Network, TokenBalancesResponse } from 'alchemy-sdk';
import { AlchemyMultichainClient } from 'src/alchemy/alchemy-multichain-client';
import { WalletService } from './wallet-tracker.service';
import { WalletTrackerDto } from './model/wallet-tracker.dto';
import { WalletTrackerInterface } from './model/wallter-tracker.interface';

@Controller('wallet')
export class WalletController {

  private readonly logger = new Logger(WalletController.name);

  constructor(
    private walletService: WalletService,

  ) { }

  @Post('token-balance')
  async getTokenBalance(@Body()  walletTrackerDto: WalletTrackerDto): Promise<TokenBalancesResponse> {
  this.logger.log("Received Wallet Requests for address {}", walletTrackerDto.walletAddress)  
  
  const getTokenBalanceResponse = this.walletService.getTokenBalance(walletTrackerDto.walletAddress, walletTrackerDto.tokenAddress)
  return getTokenBalanceResponse
  }

  @Get(':tokenAddress/metadata')
  async getTokenMetadata(@Param('tokenAddress') tokenAddress: string): Promise<any> {
  }
}
