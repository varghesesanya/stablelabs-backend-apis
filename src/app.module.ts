import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './apis/auth/auth.service';
import { UserController } from './apis/user/controller/user.controller';
import { UserSchema } from './apis/user/model/schema/user.schema';
import { UserService } from './apis/user/service/user.service';
import { WalletService } from './apis/wallet/wallet-tracker.service';
import { WalletController } from './apis/wallet/wallet-tracker.controller';

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
    })
  ],
  controllers: [UserController, WalletController],
  providers: [UserService, AuthService, JwtService, WalletService],
})
export class AppModule {
  constructor() {
    // Log the MONGODB_URL when AppModule is initialized
    Logger.log(`MONGODB_URL: ${process.env.MONGODB_URL}`, 'AppModule');
  }
}