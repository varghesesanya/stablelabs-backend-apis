import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './apis/user/model/schema/user.schema';
import { TransactionsModule } from './apis/transactions/transactions.module';
import { WalletModule } from './apis/wallet/wallet.module';
import { NFTModule } from './apis/nft/nft.module';
import { AuthModule } from './apis/auth/auth.module';
import { UserModel } from './apis/user/model/model/user.model';
import { UserService } from './apis/user/service/user.service';
import { AuthService } from './apis/auth/auth.service';
import { AlchemyMultichainConfig } from './alchemy/alchemy-multichain-config';
import { UserController } from './apis/user/controller/user.controller';
import { WalletService } from './apis/wallet/wallet-tracker.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';



@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
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
      secret: process.env.JWT_KEY, // JWT Valid Key
      signOptions: { expiresIn: '1h' }, // Optional: token expiration time
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
    AuthModule,
    WalletModule,
    TransactionsModule,
    NFTModule
  ],
  controllers:[UserController],
  providers:[{
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  }, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
  ,UserModel, UserService, AuthService, AlchemyMultichainConfig, WalletService]
})
export class AppModule {
  constructor() {
    // Log the MONGODB_URL when AppModule is initialized
    Logger.log(`MONGODB_URL: ${process.env.MONGODB_URL}`, 'AppModule');
  }
}