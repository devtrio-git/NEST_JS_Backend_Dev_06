import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from "@nestjs/common";
import { SignInDto } from '../dtos/sign-in.dto';
import { UsersService } from '../../users/providers/users.service';
import { HashProvider } from './hash.provider';
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class SignInProvider {


  constructor(
    @Inject(forwardRef(()=> UsersService))
    private readonly usersService: UsersService,

    private readonly hashProvider: HashProvider,

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokenProvider :GenerateTokenProvider
  ) {}


  async signIn(signInDto:SignInDto) {
    let user = await this.usersService.findOneUserByEmail(signInDto.email);
    let isEqual = false;

    try {
      isEqual = await this.hashProvider.comparePassword(signInDto.password, user.password);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
    if (!isEqual) {
      throw new UnauthorizedException("Incorrect email or  password");
    }

    return this.generateTokenProvider.generateToken(user);

  }
}
