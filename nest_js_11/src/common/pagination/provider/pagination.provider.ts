import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>) :Promise<Paginated<T>>
  {

    const result =  await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit, // if user set limit 10, take become 10
    });

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);

    return {
      data: result,
      meta: {
        itemsPerPage: paginationQuery.limit,
        currentPage: paginationQuery.page,
        totalItems,
        totalPages,
      }
    }
  }
}
