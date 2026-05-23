import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Paginated } from '../interface/paginated.interface';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>
  ): Promise<Paginated<T>> {
      const result = await repository.find({
        skip: (paginationQuery.page - 1) * paginationQuery.limit,
        take: paginationQuery.limit,
      })

    const totalItems = await repository.count();
      const totalPages = Math.ceil(totalItems / paginationQuery.limit);

      const finalResult: Paginated<T> = {
        data: result,
        meta: {
          totalPages,
          totalItems,
          itemsPerPage: paginationQuery.limit,
          currentPage: paginationQuery.page,
        }
      }

    return finalResult;
  }
}
