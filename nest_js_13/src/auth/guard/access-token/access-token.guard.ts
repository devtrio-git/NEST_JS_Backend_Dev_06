import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../constants/auth.contants';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AccessTokenGuard implements CanActivate {


  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    //  extract request from the context
    const request = context.switchToHttp().getRequest();
    // extract token from header

    const token:string | undefined = this.extractRequestFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    // validate token
    try {
      request[REQUEST_USER_KEY] = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration
      );
      console.log(request[REQUEST_USER_KEY]);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
  private extractRequestFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
