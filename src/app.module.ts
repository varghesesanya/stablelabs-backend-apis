import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './apis/auth/auth.service';
import { UserController } from './apis/user/controller/user.controller';
import { UserSchema } from './apis/user/model/schema/user.schema';
import { UserService } from './apis/user/service/user.service';
import { WalletService } from './apis/wallet/wallet-tracker.service';
import { WalletController } from './apis/wallet/wallet-tracker.controller';
import { AlchemyMultichainConfig } from './alchemy/alchemy-multichain-config';
import { UserModel } from './apis/user/model/model/user.model';
import { TransactionService } from './apis/transactions/transactions.service';
import { TransactionControler } from './apis/transactions/transactions.controller';
import { NFTService } from './apis/nft/nft.service';
import { NFTController } from './apis/nft/nft.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),  // Load environment variables from .env file
    MongooseModule.forRoot (process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL || 'mongodb://localhost:27017/test',  // Use the environment variable or fallback to a default value
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: "secret", // JWT Valid Key
      signOptions: { expiresIn: '1h' }, // Optional: token expiration time
    })
  ],
  controllers: [UserController, WalletController,TransactionControler, NFTController],
  providers: [UserService, AuthService, JwtService, WalletService, AlchemyMultichainConfig, UserModel, TransactionService, NFTService],
})
export class AppModule {
  constructor() {
    // Log the MONGODB_URL when AppModule is initialized
    Logger.log(`MONGODB_URL: ${process.env.MONGODB_URL}`, 'AppModule');
  }
}