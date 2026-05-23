import { Injectable } from '@nestjs/common';
import { HashProvider } from './hash.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashProvider{
  public async hashPassword(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(5);
      return await bcrypt.hash(password, salt);
  }

  public async comparePassword(password: string, encrypted:string): Promise<boolean> {
    return await bcrypt.compare(password, encrypted);
  }
}
