import { IsJSON, isJSON, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostMetaOptionDto {
  @ApiProperty({
    type: 'json',
    required: false,
    description: 'The json string for your meta option',
    example: '{sidebarEnabled : true}',
  })
  @IsJSON()
  @IsNotEmpty()
  metaValue: string;
}