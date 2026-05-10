import {
  BadRequestException,
  forwardRef, HttpException, HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { AuthService } from '../../auth/providers/auth.service';
import { GetUserParamDto } from '../dtos/get-user-param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import * as process from 'node:process';
import ProfileConfig from '../config/profile.config';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { FindOneUserByGoogleIdProvider } from './find-one-user-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { IGoogleUser } from '../interface/google-user.interface';

/**
 * User Service for Register Application Users and handle logic etc
 * */
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly configService: ConfigService,

    @Inject(ProfileConfig.KEY)
    private readonly profileConfig: ConfigType<typeof ProfileConfig>,

    private readonly usersCreateManyProvider:UsersCreateManyProvider,

    private readonly createUserProvider:CreateUserProvider,

    private readonly findUserByEmailProvider:FindUserByEmailProvider,
    private readonly findOneUserByGoogleIdProvider:FindOneUserByGoogleIdProvider,
    private readonly createGoogleUserProvider:CreateGoogleUserProvider,

  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  async createManyUsers(createManyUsersDto: CreateManyUsersDto){
    return this.usersCreateManyProvider.createManyUsers(createManyUsersDto);
  }

  findAll(getUserParamDto: GetUserParamDto, size: number, page: number) {
    const id = getUserParamDto.id;
    const isAuthenticated = this.authService.isAuthenticated(id.toString());

    console.log(this.configService.get('TEST_KEY'));
    console.log(this.profileConfig);

    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        message: 'API end point does not exist',
        fileName: 'user.service.ts'
      },
      HttpStatus.MOVED_PERMANENTLY
    )


  }

  async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  findUserByEmail(email?: string) {
    if (email) {
      return { id: 1, username: 'waqas', email: 'waqas@mail.com' };
    }
    return null;
  }

  async findOneUserByEmail(email?: string) {
    return this.findUserByEmailProvider.findUserByEmail(email);
  }

  async findOneByGoogleId(googleId: string) {
    return this.findOneUserByGoogleIdProvider.findOneByGoogleId(googleId);
  }
  async createGoogleUser(googleUser: IGoogleUser) {
    return this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
