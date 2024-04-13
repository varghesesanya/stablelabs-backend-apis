/*
 *NFT Controller - Rest Api Exposed for all NFT defined end points 
*/
import { Controller, Post, Body, Res, Param, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NFTService } from './nft.service';
import { OwnedNftsResponse } from 'alchemy-sdk';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('NFT')
@Controller('nft')
export class NFTController {

  constructor(
    private nftService: NFTService
  ) { }

  @Get(':address/transaction-history')
  async getTransactionList(@Res() response, @Param('address') address : string): Promise<OwnedNftsResponse> {
    const listOfTransactions:  OwnedNftsResponse = await this.nftService.getNFTForOwners(`${address}`);
    return listOfTransactions;
  }
}
