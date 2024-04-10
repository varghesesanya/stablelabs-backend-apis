import { Body, Controller, Get, HttpStatus, Logger, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { UserInterface } from '../model/user.interface';
import { UserService } from '../service/user-service/user.service';
@Controller('users')
export class UserController {

  constructor(
    private userService: UserService,

  ) { }

  @Post('create-account')
  async create(@Res() response, @Body() createUserDto: CreateUserDto): Promise<UserInterface> {
    try {
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