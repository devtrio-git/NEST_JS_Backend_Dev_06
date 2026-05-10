import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { SignInProvider } from './sign-in.provider';
import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly signInProvider: SignInProvider,
  ) {}

  getTokenByEmail(email: string) {

    const user = this.usersService.findUserByEmail(email)

    if (user)
      return "SAMPLE_TOKEN";

    return "NO_TOKEN"
  }

  isAuthenticated(id?:string) {
    return !!id;
  }


  async signIn(signInDto: SignInDto) {
    return this.signInProvider.signIn(signInDto)
  }

}
