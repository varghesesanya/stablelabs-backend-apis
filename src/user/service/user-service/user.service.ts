import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/model/dto/create-user.dto';
import { User } from 'src/user/model/schema/user.schema';
import { UserEntity } from 'src/user/model/user.entity';
import { UserInterface } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User')
    private userModel: Model<UserInterface>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
      const newStudent = await new this.userModel(createUserDto);
      return newStudent.save();

  }

  // private async findOne(id: number): Promise<UserInterface> {
  //   return this.userRepository.findOneBy({ id });
  // }

  // private async mailExists(email: string): Promise<boolean> {
  //   console.log("In Mail Exists")
  //   console.log(this.userRepository)
  //   const user = await this.userRepository.findOne({ where: { email } });
  //   if (user) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // async hashPassword(password: string): Promise<string> {
  //   return bcrypt.hash(password, 12);
  // }

}