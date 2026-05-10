import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IActiveUser } from '../interface/active-user.interface';
import { REQUEST_USER_KEY } from '../constants/auth.contants';

export const UserActiveDecorator = createParamDecorator(
  (field: keyof IActiveUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user:IActiveUser = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);