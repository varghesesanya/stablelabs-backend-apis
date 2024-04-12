import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/apis/auth/auth.service';
import { CreateUserDto } from 'src/apis/user/model/dto/create-user.dto';
import { LoginUserDto } from 'src/apis/user/model/dto/login-user.dto';
import { UserInterface } from 'src/apis/user/model/user.interface';
import { ActivateUserDto } from '../model/dto/activate-user.dto';
import { AlchemyConfig } from 'alchemy-sdk';
import { AlchemyMultichainConfig } from 'src/alchemy/alchemy-multichain-validation';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User')
    private userModel: Model<UserInterface>,
    private authService: AuthService,
    private alchemyMultiChainConfig :AlchemyMultichainConfig
  ) { }

  // Create User Service Method
  async createUserAccount(createUserDto: CreateUserDto): Promise<UserInterface> {
    try {
      const exists: boolean = await this.mailExists(createUserDto.email);
      const walletExists = this.alchemyMultiChainConfig.verifyUserWalletAddress(createUserDto.walletAddress)
      if (!exists && walletExists) {
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
  
  // Activate User Service Method
  async activate(acticateUserDto: ActivateUserDto): Promise<boolean> {
    try{
      const userToBeActivated = await this.userModel.findById(acticateUserDto.username)  

      const isSignatureValid = await this.alchemyMultiChainConfig.verifyUserWalletAddress(userToBeActivated.walletAddress);
        if (!isSignatureValid) {
          throw new BadRequestException('Invalid Wallet Address');
        }  
      console.log("Wallet Validated") 
      return true
    }
    catch{
      return false
    }  
  }
  
// Login User Service Method
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

  private async findByUsername(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { username } });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}