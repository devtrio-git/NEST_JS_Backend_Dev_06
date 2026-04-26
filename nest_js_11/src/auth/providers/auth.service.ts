import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {UserService} from "../../users/providers/users.service";
import { SignInDto } from "../dtos/signin.dto";
import { SignInnProvider } from './sign-inn.provider';

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,

        private readonly signInProvider: SignInnProvider

    ) { }

    getTokenByEmail(email:string) {
        const user = this.userService.findUserByEmail(email);
        if (email && user) {
            return  "Sample-Token"
        }
        return "No-Token"
    }

    isAuthenticated(id?:string) {
       return !!id;
    }

    async signIn(signInDto:SignInDto) {
      return this.signInProvider.signIn(signInDto);
    }
}
