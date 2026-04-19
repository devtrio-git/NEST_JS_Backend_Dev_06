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

    private readonly usersCreateManyProvider:UsersCreateManyProvider
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    //  is user already exist?
    let userExist = undefined;

    try {
      userExist = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request,  please try again later',
        {
          description: error || 'error connecting to the database',
        },
      );
    }

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    let newUser = this.userRepository.create(createUserDto);
    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request,  please try again later',
        {
          description: error || 'error connecting to the database',
        },
      );
    }

    return newUser;
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
}
