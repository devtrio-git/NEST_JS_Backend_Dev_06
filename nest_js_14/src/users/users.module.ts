import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { ConfigModule } from "@nestjs/config";
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import profileConfig from "./config/profile.config";
import jwtConfig from "../auth/config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { FindOneUserByGoogleIdProvider } from './providers/find-one-user-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersCreateManyProvider, CreateUserProvider, FindUserByEmailProvider, FindOneUserByGoogleIdProvider, CreateGoogleUserProvider],
  exports: [UsersService],
  imports: [
    forwardRef(()=>AuthModule),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),

    // ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync(jwtConfig.asProvider())
  ],

})
export class UsersModule {}
