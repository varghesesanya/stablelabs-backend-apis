import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller('auth')
@SkipThrottle()
export class AuthController {}
