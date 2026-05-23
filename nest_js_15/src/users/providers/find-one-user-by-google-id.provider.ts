import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByGoogleIdProvider {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

  ) {}


  async findOneByGoogleId(googleId: string): Promise<User> {
    return await this.userRepository.findOneBy({ googleId });
  }

}
