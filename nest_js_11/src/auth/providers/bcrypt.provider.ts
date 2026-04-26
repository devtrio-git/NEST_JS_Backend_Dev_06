import { Injectable } from '@nestjs/common';
import { HashProvider } from './hash.provider';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptProvider implements HashProvider {

  public async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt(5);
    return bcrypt.hash(data, salt);
  }

  comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
