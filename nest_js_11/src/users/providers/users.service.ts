import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-user-param.dto';
import { AuthService } from '../../auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import ProfileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';

/**
 * Class to create a user and save into User table
 */
@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly configService: ConfigService,

    @Inject(ProfileConfig.KEY)
    private readonly profileConfig: ConfigType<typeof ProfileConfig>,

    private readonly dataSource: DataSource,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findUserByEmailProvider: FindUserByEmailProvider,
  ) {}

  /**
   * fetch all users of user class
   */

  async createUser(createUserDto: CreateUserDto) {
   return this.createUserProvider.createUser(createUserDto);
  }

  getAllUser(getUserParamDto: GetUserParamDto, size: number, page: number) {
    const authenticated_user = this.authService.isAuthenticated('234234');

    const api_key = this.configService.get<string>('TEST_KEY');
    console.log({ api_key });
    console.log(this.profileConfig);

    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        message: 'API end point does not exists',
        fileName: 'user.service.ts',
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'API end moved permanently',
      },
    );
  }

  async findUserById(id: number) {
    let user = undefined;

    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  findUserByEmail(email: string) {
    return { id: 23, name: 'Jaffar', email };
  }

  async createMany(createUsersDto: CreateManyUsersDto){
    return await this.usersCreateManyProvider.createMany(createUsersDto);
  }

  async findOneUserByEmail(email: string){
    return await this.findUserByEmailProvider.findByEmail(email);
  }
}
