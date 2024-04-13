import { Module } from '@nestjs/common';

import { AlchemyMultichainConfig } from 'src/alchemy/alchemy-multichain-config';
import { WalletController } from './wallet-tracker.controller';
import { WalletService } from './wallet-tracker.service';

@Module({
  imports: [AlchemyMultichainConfig], // Import the module containing AlchemyMultichainConfig
  controllers: [WalletController],
  providers: [WalletService, AlchemyMultichainConfig]
})
export class WalletModule {}
