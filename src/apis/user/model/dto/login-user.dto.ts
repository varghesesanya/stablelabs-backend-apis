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
  @ApiProperty({ example: "0xFE20B85A94b8F94900f3e0108Fb1c96999D29B7f"})
  password: string;

}