import { ApiProperty } from "@nestjs/swagger";

export class WalletTrackerDto{
  @ApiProperty({
    example: '0xFE20B85A94b8F94900f3e0108Fb1c96999D29B7f',
    required: true
 })  
  walletAddress: string;
  @ApiProperty({
    example: '0xFE20B85A94b8F94900f3e0108Fb1c96999D29B7f',
    required: true
 })
    tokenAddress: string[];
  }