import { BadRequestException, Body, Controller, Get, HttpStatus, Logger, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { UserInterface } from '../model/user.interface';
import { UserService } from '../service/user-service/user.service';
import { verifyUserWalletAddress } from 'src/alchemy/alchemy-multichain-validation';
import { ethers } from 'ethers';
@Controller('users')
export class UserController {

  constructor(
    private userService: UserService,

  ) { }

  @Post('create-account')
  async create(@Res() response, @Body() createUserDto: CreateUserDto): Promise<UserInterface> {
    try {
      console.log("In the Create Account" + createUserDto)

      if (ethers.isAddress(createUserDto.walletAddress)){
        console.log("ADDRESS EXISTS for address ::: " + createUserDto
          .walletAddress
        )
      }

      const isSignatureValid = await verifyUserWalletAddress(createUserDto.walletAddress);

        if (!isSignatureValid) {
          throw new BadRequestException('Invalid Wallet Address');
        }  
      console.log("Wallet Validated")  
      const newStudent = await this.userService.createUserAccount(createUserDto);
      return response.status(HttpStatus.CREATED).json({
      message: 'User has been created successfully',
      newStudent,});
   } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: User not created!',
      error: 'Bad Request'
   });
   }
  }


//   @Post('login')
//   async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseI> {
//     const userEntity: UserInterface = this.userHelperService.loginUserDtoToEntity(loginUserDto);
//     const jwt: string = await this.userService.login(userEntity);
//     return {
//       access_token: jwt,
//       token_type: 'JWT',
//       expires_in: 10000
//     };
//   }

}