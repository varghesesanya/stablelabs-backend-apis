// user.model.ts
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from '../interface/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserModel {
  constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>) {}

  async findByEmail(email: string): Promise<UserInterface | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string): Promise<UserInterface | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async mailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async toUserInterface(createUserDto: CreateUserDto) :Promise<UserInterface>{
    const user :  UserInterface =  new this.userModel({
      email: createUserDto.email,
      password: createUserDto.password,
      walletAddress: createUserDto.walletAddress,
  });
  return user;
  }
}
