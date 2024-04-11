import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/user/model/dto/create-user.dto';
import { LoginUserDto } from 'src/user/model/dto/login-user.dto';
import { UserInterface } from 'src/user/model/user.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User')
    private userModel: Model<UserInterface>,
    private authService: AuthService
  ) { }

  async createUserAccount(createUserDto: CreateUserDto): Promise<UserInterface> {
    try {
      const exists: boolean = await this.mailExists(createUserDto.email);
      if (!exists) {
        const passwordHash: string = await this.authService.hashPassword(createUserDto.password);
        const newUser = await new this.userModel(createUserDto);
        newUser.password = passwordHash;
      console.log("User Saved")
      return newUser.save();
      } else {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }
    } catch {
      throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
    }


  }


  async login(loginUserDto: LoginUserDto): Promise<string> {
    try {
      const foundUser: UserInterface = await this.findByEmail(loginUserDto.email.toLowerCase());
      if (foundUser) {
        const matches: boolean = await this.validatePassword(loginUserDto.password, foundUser.password);
        if (matches) {
          const payload: UserInterface = await this.findByEmail(loginUserDto.email.toLowerCase());
          return this.authService.generateJwt(payload);
        } else {
          throw new HttpException('Login was not successfull, wrong credentials', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('Login was not successfull, wrong credentials', HttpStatus.UNAUTHORIZED);
      }
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  private async validatePassword(password: string, storedPasswordHash: string): Promise<any> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }


  private async findByEmail(email: string): Promise<UserInterface> {
    return this.userModel.findOne({ email }, { select: ['id', 'email', 'username', 'password'] });
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