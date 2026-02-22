import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
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


}
