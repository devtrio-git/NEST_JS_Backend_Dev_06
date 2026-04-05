import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class PatchPostDto  extends PartialType(CreatePostDto){

  @ApiProperty({
    description: "Id of the post that you want to be updated",
    example: 123
  })
  @IsInt()
  @IsNotEmpty()
  id:number;
}