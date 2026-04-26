import {IsInt, IsOptional} from "class-validator";
import {Type} from "class-transformer";
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserParamDto {
    @ApiPropertyOptional({
      description:'fetch specific user by id',
      example: 103
    })
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    id?: number;
}