import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from "./dtos/patch-post.dto";

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get(':id?')
  getAllPosts(@Param('id') id: string) {
    return this.postService.getAllPosts(id);
  }

  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({
    status: 201,
    description: 'Post Created successfully',
  })
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Update a new blog post' })
  @ApiResponse({
    status: 200,
    description: 'Post Update successfully',
  })

  @Patch()
  updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postService.updatePost(patchPostDto);
  }
}
