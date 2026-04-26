import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UserService } from '../../users/providers/users.service';
import { HashProvider } from './hash.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInnProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly hashProvider: HashProvider,

    //   inject jwt service as default nest js

    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

  ) { }


  async signIn(signInDto: SignInDto) {
    let user = await this.userService.findOneUserByEmail(signInDto.email);
    let isEqual: boolean = false;
    try {
      isEqual = await this.hashProvider.comparePassword(
        signInDto.password,
        user.password
      )
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: "Could not compare password"
      })
    }

    if (!isEqual) {
      throw new UnauthorizedException("Incorrect email or password");
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email
    }, {
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
      secret: this.jwtConfiguration.secret,
      expiresIn: this.jwtConfiguration.accessTokenTTL
    })
    return { accessToken }
  }
}
