import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import {AuthService} from "./providers/auth.service";
import {UsersModule} from "../users/users.module";
import { HashProvider } from './providers/hash.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInnProvider } from './providers/sign-inn.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: HashProvider,
      useClass: BcryptProvider,
    },
    SignInnProvider
  ],
  imports:[
    forwardRef(()=>UsersModule),

    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  exports: [AuthService, HashProvider],
})
export class AuthModule {}
