import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from "@nestjs/swagger";
import { SignInDto } from './dtos/sign-in.dto';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enum/auth-type.enum';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get(':email?')
  getTokenByEmail(@Param('email') email: string) {
    return this.authService.getTokenByEmail(email);
  }

  @Auth(AuthType.NONE)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

}
