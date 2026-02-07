import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/providers/auth.service';
import { GetUserParamDto } from "../dtos/get-user-param.dto";


/**
 * User Service for Register Application Users and handle logic etc
 * */
@Injectable()
export class UsersService {

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

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
