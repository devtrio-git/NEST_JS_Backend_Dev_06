import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { IGoogleUser } from '../interface/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  async createGoogleUser(googleUser:IGoogleUser){
    try {
      let newUser = this.userRepository.create(googleUser);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
