import { status } from '../enums/status.enum';
import { postType } from '../enums/postType.enum';
import {
  IsArray,
  IsEnum, IsInt, IsISO8601, IsJSON,
  IsNotEmpty, IsOptional, isString,
  IsString, IsUrl,
  Matches, MaxLength,
  MinLength, ValidateNested,
} from 'class-validator';
import { CreatePostMetaOptionDto } from '../../meta-options/dtos/create-post-meta-option.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'write your post title',
    example: 'MERN STACK FUTURE',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @MaxLength(128)
  title: string;

  @ApiProperty({
    enum: postType,
    example: 'series',
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: 'slug must in be a lowercase letter and number',
    example: 'mern-220',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    enum: status,
    example: 'draft',
  })
  @IsEnum(status)
  @IsNotEmpty()
  status: status;

  @ApiPropertyOptional({
    description: 'your post content or detail, if any',
    example: 'lorem lorem lorem....',
  })
  @IsString()
  @IsOptional()
  @MaxLength(512)
  content?: string;

  @ApiPropertyOptional({
    description: 'Only serialize json accepted',
    example: '{"name":"Owais","exp":10,"edu":"MS"}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'your post image, if any',
    example: 'http://example.com/1.png',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'post creation date',
    example: '2026-02-07T10:30:00Z',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'post creation date',
    example: [2, 5],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    properties: {
      metaValue: {
        type: 'json',
        description: 'The json string for your meta option',
        example: '{sidebarEnabled : true}',
      },
    },
  })
  @IsOptional()
  @Type(() => CreatePostMetaOptionDto)
  metaOptions?: CreatePostMetaOptionDto | null;

  @ApiProperty({
    type:  'integer',
    required: true,
    example:  1
  })
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
