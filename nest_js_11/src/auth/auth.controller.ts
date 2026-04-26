import { Body, Controller, Get, Param, Post, HttpCode, HttpStatus } from '@nestjs/common';
import {AuthService} from "./providers/auth.service";
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
@ApiTags("Authentication")
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Get(':email?')
    public getAuthToken(@Param('email') email: string) {
        return this.authService.getTokenByEmail(email);
    }

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    public async signIn(@Body() signInDto:SignInDto){
      return this.authService.signIn(signInDto);
    }
}
