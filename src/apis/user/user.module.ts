import { Module } from '@nestjs/common';
import { UserEntity } from './model/user.entity';
import { AuthModule } from 'src/apis/auth/auth.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlchemyMultichainConfig } from 'src/alchemy/alchemy-multichain-config';
import { UserModel } from './model/model/user.model';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    AlchemyMultichainConfig
  ],
  controllers: [UserController],
  providers: [ UserService, UserModel, AuthService, AlchemyMultichainConfig]
})
export class UserModule {}