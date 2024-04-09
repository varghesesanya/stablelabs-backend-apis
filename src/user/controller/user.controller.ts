import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { UserInterface } from '../model/user.interface';
import { UserService } from '../service/user-service/user.service';
import { UserHelperService } from '../service/user-helper/user-helper.service';
@Controller('users')
export class UserController {

  constructor(
    private userService: UserService,
    private userHelperService: UserHelperService

  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserInterface> {
    const userEntity: UserInterface = this.userHelperService.createUserDtoToEntity(createUserDto);
    return this.userService.create(userEntity);
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