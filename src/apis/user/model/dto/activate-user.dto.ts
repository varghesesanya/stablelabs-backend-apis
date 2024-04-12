import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { LoginUserDto } from "./login-user.dto";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Create User DTO -- Request Body for User Creation
 * ApiProperty for Swagger View
*/
export class ActivateUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'rsayani',
    required: true
 })
  username: string;
}