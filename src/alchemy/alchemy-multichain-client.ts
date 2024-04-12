import { Alchemy, AlchemySettings, AssetTransfersCategory, AssetTransfersResponse, BigNumber, Network, OwnedBaseNft, OwnedNftsResponse, SortingOrder, TokenBalancesResponse } from 'alchemy-sdk';

export class AlchemyMultichainClient {
  readonly settings: AlchemyMultichainSettings;
  readonly overrides: Partial<Record<Network, AlchemyMultichainSettings>>;
  private readonly instances: Map<Network, Alchemy> = new Map();

  constructor(
    settings: AlchemyMultichainSettings,
    overrides?: Partial<Record<Network, AlchemyMultichainSettings>>
  ) {
    this.settings = settings;
    this.overrides = overrides;
  }

  forNetwork(network: Network): Alchemy {
    return this.loadInstance(network);
  }
/**
 * Overides the network for a multichain implementation 
 * @param network 
 * @returns 
 */
  private loadInstance(network: Network): Alchemy {
    if (!this.instances.has(network)) {
      const alchemySettings =
        this.overrides && this.overrides[network]
          ? { ...this.overrides[network], network }
          : { ...this.settings, network };
      this.instances.set(network, new Alchemy(alchemySettings));
    }
    return this.instances.get(network);
  }

  async verifyAddress(network: Network, walletAddress: string): Promise<{ isValid: boolean }> {
    try {
      const alchemyInstance = this.forNetwork(network);
      const balance = await alchemyInstance.core.getBalance(walletAddress);
      return { isValid: balance.gt(0) || balance.eq(0)};
    } catch (error) {
      console.error("Error verifying wallet address:", error);
      return { isValid: false };
    }
  }

  async getTokenBalance(network: Network, walletAddress: string, tokenAddress: string[]): Promise<TokenBalancesResponse>{
    try {
      const alchemyInstance = this.forNetwork(network);
      const balances = await alchemyInstance.core.getTokenBalances(walletAddress, tokenAddress);
      return balances;
    } catch (error) {
      throw new Error(`Error fetching token balances: ${error.message}`);
    }
  }

  async getTransactionsFromAddress(network: Network, walletAddress: string): Promise<AssetTransfersResponse> {
    try {
      const alchemyInstance = this.forNetwork(network);

      const ethResponse: AssetTransfersResponse = await alchemyInstance.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: walletAddress,
        category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC1155, AssetTransfersCategory.ERC20, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.SPECIALNFT],
        order: SortingOrder.DESCENDING // Specify sorting order as descending
      });

      return ethResponse;
    } catch (error) {
      throw new Error(`Error fetching transactions: ${error.message}`);
    }
  }

  async getNFTForOwners(network: Network, walletAddress: string): Promise<OwnedNftsResponse>{
    try {
      const alchemyInstance = this.forNetwork(network);
      const ethResponse :OwnedNftsResponse = await alchemyInstance.nft.getNftsForOwner(walletAddress);
      return ethResponse;
    } catch (error) {
      throw new Error(`Error fetching nft details: ${error.message}`);
    }
  }
}

export type AlchemyMultichainSettings = Omit<AlchemySettings, 'network'>;
