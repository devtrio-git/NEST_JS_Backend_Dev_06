import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthChecker(): {status:string} {
    return {status: 'Ok'};
  }
}
