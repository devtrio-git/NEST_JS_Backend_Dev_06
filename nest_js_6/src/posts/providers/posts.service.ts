import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from "../dtos/create-post.dto";
import { PatchPostDto } from "../dtos/patch-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

  ) {}


  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    //   without cascade
    // create a metaOption first, coz each post has one meta option
    // create post
    // add metaOptioion in post
    // return;

    let post = this.postRepository.create(createPostDto);
    post = await this.postRepository.save(post);
    return post;

  }

  async allPost(id?: string): Promise<Post[]> {
    // return await this.postRepository.find({
    //   relations: {
    //     metaOptions: true
    //   }
    // });
    return await this.postRepository.find();

  }

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

  // createPost(createPostDto: CreatePostDto) {
  //   return createPostDto;
  // }

  updatePost(patchPostDto: PatchPostDto) {
    return patchPostDto;
  }

  deletePost(id:number){
    // find post
    // delete this post first
    // then delete it metaOption
    // confirm message

    return {deleted:true, id}
  }

}
