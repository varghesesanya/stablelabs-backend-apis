import { Module } from '@nestjs/common';
import { UserEntity } from './model/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user-service/user.service';
import { UserHelperService } from './service/user-helper/user-helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService, UserHelperService],
  exports: [UserService]
})
export class UserModule {}