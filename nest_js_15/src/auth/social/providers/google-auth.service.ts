import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { UsersService } from "../../../users/providers/users.service";
import { GenerateTokenProvider } from "../../providers/generate-token.provider";
import { OAuth2Client } from "google-auth-library";
import { GoogleTokenDto } from "../dtos/google-token.dto";
import { IGoogleUser } from "../../../users/interface/google-user.interface";

@Injectable()
export class GoogleAuthService implements  OnModuleInit{

  private oauthClient: OAuth2Client;

  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef(()=> UsersService))
    private readonly usersService: UsersService,

    private readonly generateTokenProvider :GenerateTokenProvider

  ) {}


  onModuleInit() {
    this.oauthClient = new OAuth2Client(
      this.jwtConfiguration.googleClientId,
      this.jwtConfiguration.googleClientSecret
    );
  }


  async authenticate(googleTokenDto:GoogleTokenDto){
    try{

      const tokenTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      })

      console.log({tokenTicket});
     const {email, sub: googleId, given_name:firstName, family_name:lastName}  = tokenTicket.getPayload();

      const user = await this.usersService.findOneByGoogleId(googleId);

      if(user){
        return await this.generateTokenProvider.generateToken(user);
      }

      const newUser = await this.usersService.createGoogleUser({
        firstName,
        lastName,
        email,
        googleId
      } as IGoogleUser);

      return await this.generateTokenProvider.generateToken(newUser);

    } catch (error) {
      throw new UnauthorizedException()
    }
  }




}
