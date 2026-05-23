import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUserParamDto {
  @ApiPropertyOptional({
    description: 'Fetch specific user by userId',
    example: 10
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id?: number;
}
