import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {
  }

  @Get(":id?")
  getAllPosts(@Param('id') id:string) {
    return this.postService.getAllPosts(id);
  }
}
