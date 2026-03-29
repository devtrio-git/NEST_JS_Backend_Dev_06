import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { TagsService } from '../../tags/providers/tags.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,

    private readonly tagsService: TagsService,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    let author = await this.usersService.findUserById(createPostDto.authorId);
    let tags = [];

    if ((createPostDto.tags.length ?? 0) > 0) {
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    }

    let post = this.postRepository.create({
      ...createPostDto,
      tags: tags,
      author: author,
    });
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
    // const user = this.usersService.findUserById(id)

    // if (user) {
    //   return [
    //     { id: 1, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
    //     { id: 1, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
    //     { id: 1, title: 'Posts', body: 'Lorem ipsum dolor sit amet' },
    //   ];
    // }

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

  async updatePost(patchPostDto: PatchPostDto) {
    let tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

    let post = await  this.postRepository.findOneBy({
      id: patchPostDto.id,
    })

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ??  post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;

    post.tags = tags ?? post.tags;

    return await this.postRepository.save(post);
  }

  async deletePost(id: number) {
    // // find post
    // const post = await this.postRepository.findOneBy({id})
    // // delete this post first
    //
    // await this.postRepository.delete(id)
    // // then delete it metaOption
    // if (post.metaOptions){
    //   await this.metaOptionRepository.delete(post.metaOptions.id)
    // }
    //
    // // confirm message

    await this.postRepository.delete(id);
    return { deleted: true, id };
  }
  //
  // async deletePost(id:number){
  //    const post = await this.postRepository.findOneBy({id});
  //
  //    const meta_option = await  this.metaOptionRepository.find({
  //      where:{ id: post.metaOptions.id},
  //      relations: {
  //        post:true
  //      }
  //    })
  //
  //   return meta_option
  // }
}
