// auth/auth.controller.ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Google OAuth will redirect here for authentication
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req) {
    // Successful authentication, redirect or respond with user information
    return {
      message: 'Google authentication successful',
      user: req.user,
    };
  }
}
