import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get(':email?')
  getTokenByEmail(@Param('email') email: string) {
    return this.authService.getTokenByEmail(email);
  }

}
