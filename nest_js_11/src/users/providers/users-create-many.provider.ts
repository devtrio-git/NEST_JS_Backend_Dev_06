import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {

  constructor(
    private readonly dataSource: DataSource,
  ) {
  }

  async createMany(createUserDtoList: CreateManyUsersDto){
    let newUserList:User[] = [];
      const queryRunner = this.dataSource.createQueryRunner();

    try {
      // create instance of query runner
      //   connect query runner
      await queryRunner.connect()
      // start transaction
      await queryRunner.startTransaction()
    } catch (error) {
      throw new RequestTimeoutException("Unable to connect to the database.");
    }


    try {
      for (let user of createUserDtoList.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUserList.push(result);
      }
      // commit if all successful
      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new ConflictException("Could not complete the transaction.", {
        description: String(error)
      });
    } finally {
      await queryRunner.release();
    }

    return { user:newUserList }

  }

  async createManyWithoutException(createUserDtoList: CreateManyUsersDto){
    let newUserList:User[] = [];
    // create instance of query runner
    const queryRunner = this.dataSource.createQueryRunner();
    //   connect query runner
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    try {
      for (let user of createUserDtoList.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUserList.push(result);
      }
      // commit if all successful
      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {

      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException("Unable to release database.", {
          description: String(error)
        });
      }

    }

    return { user:newUserList }

  }


}
