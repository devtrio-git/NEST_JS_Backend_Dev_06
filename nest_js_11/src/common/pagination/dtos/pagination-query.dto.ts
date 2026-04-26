import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  // @Type(()=>Number) // no need apply impleset conversion at main.ts
  @IsOptional()
  @IsPositive()
  limit?:  number = 10;

  // @Type(()=>Number)
  @IsOptional()
  @IsPositive()
  page?:  number = 1;
}