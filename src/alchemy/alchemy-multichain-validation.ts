import { AlchemyMultichainClient } from './alchemy-multichain-client';
import { Network } from 'alchemy-sdk';

export async function verifyUserWalletAddress(walletAddress: string): Promise<boolean> {
  // Default config to use for all networks.
  const defaultConfig = {
    apiKey: 'xo-rjJ9wSTW97wzuL2eNzn9v3lGKNH9J', // Replace with your Alchemy API key
  };
  // Include optional setting overrides for specific networks.
  const overrides = {
    // TODO: Replace with your API keys.
    [Network.ETH_MAINNET]: { apiKey: 'xo-rjJ9wSTW97wzuL2eNzn9v3lGKNH9J' },
    [Network.MATIC_MAINNET]: { apiKey: 'matic-api-key', maxRetries: 10 },
    [Network.ARB_MAINNET]: { apiKey: 'arb-api-key' }
  };
  const alchemy = new AlchemyMultichainClient(defaultConfig, overrides);

  // Verify the wallet address
  const ethResponse = await alchemy.verifyAddress(Network.ETH_MAINNET, walletAddress);
  return ethResponse.isValid;
}
