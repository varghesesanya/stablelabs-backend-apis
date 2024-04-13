import { Body, Controller, Get, Param } from '@nestjs/common';
import { Network, TokenBalancesResponse } from 'alchemy-sdk';
import { AlchemyMultichainClient } from 'src/alchemy/alchemy-multichain-client';
import { WalletService } from './wallet-tracker.service';
import { WalletTrackerDto } from './model/wallet-tracker.dto';
import { WalletTrackerInterface } from './model/wallter-tracker.interface';

@Controller('wallet')
export class WalletController {
  constructor(
    private walletService: WalletService,

  ) { }

  @Get('token-balance')
  async getTokenBalance(@Body()  walletTrackerDto: WalletTrackerDto): Promise<TokenBalancesResponse> {
  const getTokenBalanceResponse = this.walletService.getTokenBalance(walletTrackerDto.walletAddress, walletTrackerDto.tokenAddress)
  return getTokenBalanceResponse
  }

  @Get(':tokenAddress/metadata')
  async getTokenMetadata(@Param('tokenAddress') tokenAddress: string): Promise<any> {
  }
}
