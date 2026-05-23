import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from "../constants/auth.contants";
import { AuthType } from "../enum/auth-type.enum";

export const Auth = (...args: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, args);
