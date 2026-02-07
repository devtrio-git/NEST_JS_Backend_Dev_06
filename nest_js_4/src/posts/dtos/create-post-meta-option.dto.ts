import { IsNotEmpty, IsString } from 'class-validator';

export  class CreatePostMetaOption {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any;

}