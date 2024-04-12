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
import { AlchemyMultichainConfig } from './alchemy/alchemy-multichain-validation';
import { UserModel } from './apis/user/model/model/user.model';

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
  controllers: [UserController, WalletController],
  providers: [UserService, AuthService, JwtService, WalletService, AlchemyMultichainConfig, UserModel],
})
export class AppModule {
  constructor() {
    // Log the MONGODB_URL when AppModule is initialized
    Logger.log(`MONGODB_URL: ${process.env.MONGODB_URL}`, 'AppModule');
  }
}