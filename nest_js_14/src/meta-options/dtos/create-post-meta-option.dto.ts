import { IsJSON, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export  class CreatePostMetaOptionDto {
  @ApiProperty({
    type: 'json',
    required: true,
    description: "Th json string for your post meta option",
    example: '{sidebarEnabled: true}'
  })
  @IsJSON()
  @IsNotEmpty()
  metaValue:string;

}