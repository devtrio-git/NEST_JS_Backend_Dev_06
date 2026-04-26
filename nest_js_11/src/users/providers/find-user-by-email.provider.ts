import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async findByEmail(email: string): Promise<User | null> {
    let user: User | undefined = undefined;
    try {
      user  = await this.userRepository.findOneBy({email});
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: "Could not fetch user by email",
      })
    }

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return user;
  }
}
