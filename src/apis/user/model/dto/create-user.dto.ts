import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { LoginUserDto } from "./login-user.dto";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Create User DTO -- Request Body for User Creation
 * ApiProperty for Swagger View
*/
export class CreateUserDto extends LoginUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'rsayani@gmail.com',
    required: true
 })
  username: string;
  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true
 })
 @IsEmail()
  email: string;
  @ApiProperty({
    example: '1234578910',
    required: true
 })
 @IsNotEmpty()
 @MinLength(6)
  password: string;
  @ApiProperty({ example: "0xFE20B85A94b8F94900f3e0108Fb1c96999D29B7f"})
  walletAddress: string;
}