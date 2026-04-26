import { Controller, Post, Get, Param, Body, Patch, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from "./dtos/get-posts.dto";

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get(':userId?')
  @ApiOperation({ summary: 'Find all blog posts' })
  @ApiResponse({
    status: 200,
    description: "Posts fetched successfully",
  })
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    console.log(postQuery);
    return this.postsService.allPosts(postQuery, userId);
  }

  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({
    status: 201,
    description: "Post created successfully",
  })


  @ApiOperation({ summary: 'Update a blog post by id' })
  @ApiResponse({
    status: 200,
    description: "Post updated successfully",
  })
  @Patch()
  public updatePost(@Body() updatePostDto: PatchPostDto) {
    return this.postsService.updatePost(updatePostDto);
  }

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) postId: number) {
    return this.postsService.deletePost(postId);
  }
}
