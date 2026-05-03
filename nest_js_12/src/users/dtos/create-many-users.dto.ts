import { CreateUserDto } from './create-user.dto';
import { ArrayMinSize, ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyUsersDto {

  @ApiProperty({
    type: 'array',
    required:true,
    items: {
      type: 'object',
    }
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({each: true})
  @Type(() => CreateUserDto)
  users:CreateUserDto[];
}