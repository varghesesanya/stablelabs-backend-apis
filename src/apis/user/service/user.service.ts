import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/apis/auth/auth.service';
import { CreateUserDto } from 'src/apis/user/model/dto/create-user.dto';
import { LoginUserDto } from 'src/apis/user/model/dto/login-user.dto';
import { UserInterface } from 'src/apis/user/model/interface/user.interface';
import { ActivateUserDto } from '../model/dto/activate-user.dto';
import { AlchemyMultichainConfig } from 'src/alchemy/alchemy-multichain-config';
import { UserModel } from '../model/model/user.model';
import { ethers } from 'ethers';
import { WalletService } from 'src/apis/wallet/wallet-tracker.service';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);


  constructor(
    @InjectModel('User')
    private userInterface: Model<UserInterface>,
    private userModel: UserModel,
    private walletService: WalletService,
    private authService: AuthService,
    private alchemyMultiChainConfig :AlchemyMultichainConfig
  ) { }

  // Create User Service Method
  async createUserAccount(createUserDto: CreateUserDto): Promise<UserInterface> {
    try {
      const exists: boolean = await this.userModel.mailExists(createUserDto.email);
      const walletExists = this.alchemyMultiChainConfig.verifyUserWalletAddress(createUserDto.walletAddress)
      if (!exists && walletExists) {
        // Hash Password
        const passwordHash: string = await this.authService.hashPassword(createUserDto.password);
        const newUser = await new this.userInterface(createUserDto);
        newUser.password = passwordHash;
      return newUser.save();
      } else {
        this.logger.log("User already exists/ Wallet Verification Failed")
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }
    } catch {
      this.logger.log("Failed to create user, internal server error")
      throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
    }
  }
  
  // Activate User Service Method -- Verifying Valid Wallet Address
  async activate(activateUserDto: ActivateUserDto): Promise<boolean> {
    try {
      const foundUser: UserInterface | null = await this.userModel.findByUsername(activateUserDto.username);
      this.logger.log("User Found to Acyivate Account {}", foundUser.username)
      if (!foundUser) {
        throw new NotFoundException(`User with username '${activateUserDto.username}' not found`);
      }
  
      const isSignatureValid = await this.alchemyMultiChainConfig.verifyUserWalletAddress(foundUser.walletAddress);
  
      if (!isSignatureValid) {
        throw new BadRequestException('Invalid Wallet Address');
      }
      console.log("Wallet Validated");
      return true;
    } catch (error) {
      // Log or handle specific errors
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; // Re-throw the specific error with appropriate status code and message
      } else {
        console.error('Error occurred during user activation:', error);
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  // Activate User Service Method -- Verifying Valid Wallet Address
  // Activation for Ethereum Wallets
  async activateMessageSignature(activateUserDto: ActivateUserDto): Promise<boolean> {
    try {
      const foundUser: UserInterface | null = await this.userModel.findByUsername(activateUserDto.username);
      this.logger.log("User Found to Activate Account {}", foundUser.username)
      if (!foundUser) {
        throw new NotFoundException(`User with username '${activateUserDto.username}' not found`);
      }
  
      const isSignatureValid = await this.walletService.verifyWalletWithSignature(foundUser.walletAddress, activateUserDto.message);
      if (!isSignatureValid) {
        throw new BadRequestException('Invalid Wallet Address');
      }
      console.log("Wallet Validated");
      return true;
    } catch (error) {
      // Log or handle specific errors
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; // Re-throw the specific error with appropriate status code and message
      } else {
        console.error('Error occurred during user activation:', error);
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }


// Login User Service Method
async login(loginUserDto: LoginUserDto): Promise<string> {
  try {
    const foundUser: UserInterface | null = await this.userModel.findByEmail(loginUserDto.email.toLowerCase());
    if (!foundUser) {
      throw new UnauthorizedException('Login was not successful, wrong credentials');
    }
    const matches: boolean = await this.validatePassword(loginUserDto.password, foundUser.password);
    if (!matches) {
      throw new UnauthorizedException('Login was not successful, wrong credentials');
    }
    return "login succesful"
     //return this.authService.generateJwt(foundUser);
  } catch (error) {
    if (error instanceof HttpException) {
      throw error; // Re-throw HttpException with the appropriate status code
    } else {
      // Log or handle unexpected errors
      console.error('Error occurred during login:', error);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}

  private async validatePassword(password: string, storedPasswordHash: string): Promise<any> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }


}