import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from "../dtos/create-post.dto";
import { PatchPostDto } from "../dtos/patch-post.dto";

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}


  getAllPosts(id?: string) {
    const user = this.usersService.findUserById(id)

    if (user) {
      return [
        { id: 1, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
        { id: 1, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
        { id: 1, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
      ];
    }

    return [
      { id: 1, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
      { id: 2, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
      { id: 3, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
      { id: 4, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
      { id: 5, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
      { id: 6, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
    ];
  }

  createPost(createPostDto: CreatePostDto) {
    return createPostDto;
  }

  updatePost(patchPostDto: PatchPostDto) {
    return patchPostDto;
  }


}
