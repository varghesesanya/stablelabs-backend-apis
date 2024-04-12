/*
 *User Controller - Rest Api Exposed for all User defined end points 
*/



import { BadRequestException, Body, Controller, Get, HttpStatus, Logger, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { UserInterface } from '../model/interface/user.interface';
import { UserService } from '../service/user.service';
import { ethers } from 'ethers';
import { LoginUserDto } from '../model/dto/login-user.dto';
import { LoginResponseInterface } from '../model/interface/login.interface';
import { ApiTags } from '@nestjs/swagger';
import { ActivateUserDto } from '../model/dto/activate-user.dto';
import { response } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(
    private userService: UserService,
  ) { }

/**
 * User Creation at /user/create-account
*/
  @Post('create-account')
  async create(@Res() response, @Body() createUserDto: CreateUserDto): Promise<UserInterface> {
    try {
      const newUser = await this.userService.createUserAccount(createUserDto);
      return response.status(HttpStatus.CREATED).json({
      message: 'User has been created successfully',
      newUser});
   } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: User not created!',
      error: 'Bad Request'
   });
   }
  }

/**
 * User Activation at /user/activate
*/

  @Post('activate')
  async activate(@Res() response, @Body() activateUserDto: ActivateUserDto) {
  try{const accountActivated  = await this.userService.activate(activateUserDto);
    if(accountActivated){
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been Activated'});
    }
    else{
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid/ Inactivate Wallet Address provided at registration'});
    }
  }
  catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: User not created!',
      error: 'Bad Request'
   })
  }
  }
  


  @Post('user-login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseInterface> {
    const jwt: string = await this.userService.login(loginUserDto);
    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: 10000
    };
  }

}