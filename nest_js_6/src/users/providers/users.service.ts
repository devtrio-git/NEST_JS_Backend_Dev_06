import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/providers/auth.service';
import { GetUserParamDto } from "../dtos/get-user-param.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';


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
  ) {}


  async createUser(createUserDto: CreateUserDto){
    //  is user already exist?

    const userExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    })

    // create user
    if (!userExist){
      let newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    }



    // if exist return dto

    return createUserDto
  }

  findAll(getUserParamDto: GetUserParamDto, size:number,  page:number) {
    const id = getUserParamDto.id;
    const isAuthenticated = this.authService.isAuthenticated(id.toString());

    if (!isAuthenticated){
      return []
    }

    return [
      {id: 1, username: 'waqas', email: 'waqas@mail.com'},
      {id: 1, username: 'yasir', email: 'yasir@mail.com'},
      {id: 1, username: 'sarim', email: 'sarim@mail.com'}
    ]
  }

  findUserById(id?:string) {
    if (id){
      return {id: 1, username: 'waqas', email: 'waqas@mail.com'}
    }
    return null
  }

  findUserByEmail(email?:string) {
    if (email){
      return {id: 1, username: 'waqas', email: 'waqas@mail.com'}
    }
    return null
  }
}
