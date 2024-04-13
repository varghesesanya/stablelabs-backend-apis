
// nft.module.ts
import { Module } from '@nestjs/common';
import { NFTController } from './nft.controller';
import { NFTService } from './nft.service';
import { AlchemyMultichainConfig } from 'src/alchemy/alchemy-multichain-config';

@Module({
  imports: [AlchemyMultichainConfig],
  controllers: [NFTController],
  providers: [NFTService, AlchemyMultichainConfig],
})
export class NFTModule {}