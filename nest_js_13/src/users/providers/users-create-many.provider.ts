import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    private readonly dataSource: DataSource
  ) {}

  async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    let newUsersList: User[] = [];

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction()
    } catch (error) {
      throw new RequestTimeoutException("Unable to connect to the database.");
    }

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsersList.push(result);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new ConflictException("Could not complete the transaction.", {
          description: String(error),
        });
    } finally {
       await queryRunner.release();
    }

    return { newUsersList };
  }
}
