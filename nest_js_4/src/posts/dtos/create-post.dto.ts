import { postType } from "../enums/postType.enum";
import { status } from "../enums/status.enum";
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength, ValidateNested
} from "class-validator";
import { CreatePostMetaOption } from "./create-post-meta-option.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export  class CreatePostDto {

  @ApiProperty({
    description: 'Your post title',
    example: "MERN STACK DEVELOPMENT FUTURE"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @ApiProperty({
    enum: postType,
    example: "series"
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: "slug must in be a lowercase letter and number",
    example: 'mern-255'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "A slug must be a valid slug like malik-git786",
  })
  slug: string;

  @ApiProperty({
    enum: status,
    example: "draft"
  })
  @IsEnum(status)
  @IsNotEmpty()
  status:status;

  @ApiPropertyOptional({
    description: 'Your post content',
    example: "lorem lorem lorem lorem lorem lorem..."
  })
  @IsString()
  @IsOptional()
  content?:string;

  @ApiPropertyOptional({
    description: 'Only serialize json accepted',
    example: "{\"@type\":\"BlogPosting\",\"headline\":\"Malik Blog Post\"}"
  })
  @IsJSON()
  @IsOptional()
  schema?:string;

  @ApiPropertyOptional({
    description: 'Your Post Feature image',
    example: "http://example.com/2.png"
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?:string;

  @ApiPropertyOptional({
    description: 'Post created date must in IOS format',
    example: "2026-02-07T10:00:00Z"
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?:Date;

  @ApiPropertyOptional({
    description: 'Post created date must in IOS format',
    example: ["REACT", "ANGULAR", "NODE", "SRINGBOOT"]
  })
  @IsArray()
  @IsOptional()
  @MinLength(3, {each:true})
  tags?:string[]

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: "string",
          description: "The key can be any string identifier for your meta option",
          example: "sidebarEnabled"
        },
        value: {
          type: "string",
          description: "Any value that you want to save to the kay",
          example: true
        }
      }
    }
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({each:true})
  @Type(() => CreatePostMetaOption)
  metaOptions?:CreatePostMetaOption[];

}