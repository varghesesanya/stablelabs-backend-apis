import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {

  @IsEmail()
  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true
 })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: "12345678910"})
  password: string;

}