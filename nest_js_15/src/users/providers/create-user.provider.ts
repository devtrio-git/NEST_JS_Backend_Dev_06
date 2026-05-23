import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { Repository } from "typeorm";
import { HashProvider } from "../../auth/providers/hash.provider";
import { MailService } from '../../mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(()=> HashProvider))
    private readonly hashProvider: HashProvider,

    private readonly mailService: MailService,
  ) {};

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

    let newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.hashProvider.hashPassword(createUserDto.password),
    });
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

    try {
      await this.mailService.sendUserWelcomeMail(newUser)
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException()
    }


    return newUser;
  }
}
