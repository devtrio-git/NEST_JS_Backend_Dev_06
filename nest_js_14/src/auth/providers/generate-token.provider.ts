import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from '../../users/user.entity';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(
    userId: number,
    expirationTime: number,
    payload: T,
  ) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: expirationTime,
      },
    );
  }

  public async generateToken(user: User) {
    const [access_token, refresh_token] = await Promise.all([
      await this.signToken(user.id, this.jwtConfiguration.accessTokenTTL, {
        email: user.email,
      }),
      await this.signToken(user.id, this.jwtConfiguration.accessRefreshTTL, {
        email: user.email,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
