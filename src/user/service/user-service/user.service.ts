import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/model/dto/create-user.dto';
import { UserInterface } from 'src/user/model/user.interface';
import Web3 from 'web3';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User')
    private userModel: Model<UserInterface>
  ) { }

  async createUserAccount(createUserDto: CreateUserDto): Promise<UserInterface> {
      const newUser = await new this.userModel(createUserDto);
      console.log("User Saved")
      return newUser.save();

  }

  private async mailExists(email: string): Promise<boolean> {

    const user = await this.userModel.findOne({ where: { email } });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}