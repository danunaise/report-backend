import { Controller, Post, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data) {
    return this.authService.login(data.username, data.password);
  }
}
