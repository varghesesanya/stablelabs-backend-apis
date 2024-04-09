import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
    type: 'mongodb',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true
  }),
  UserModule,
  AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}