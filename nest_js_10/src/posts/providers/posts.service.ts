import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { TagsService } from '../../tags/providers/tags.service';
import { GetPostsDto } from "../dtos/get-post.dto";
import { PaginationProvider } from "../../common/pagination/provider/pagination.provider";
import { Paginated } from "../../common/pagination/interface/paginated.interface";

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,

    private readonly tagsService: TagsService,
    private readonly paginationProvider: PaginationProvider,

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

  async allPost(postQuery: GetPostsDto, id?: string): Promise<Paginated<Post>> {
    return this.paginationProvider.paginateQuery({
      limit: postQuery.limit,
      page: postQuery.page,
    }, this.postRepository)
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
    let tags = undefined;
    let post = undefined;

    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request,  please try again later',
        {
          description: error || 'error connecting to the database',
        },
      );
    }

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'Please check your tags ids and ensure they are correct',
      );
    }

    try {
      post = await this.postRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request,  please try again later',
        {
          description: error || 'error connecting to the database',
        },
      );
    }

    if (!post) {
      throw new BadRequestException('Post not  found');
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;

    post.tags = tags ?? post.tags;

    try {
      post = await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request,  please try again later',
        {
          description: error || 'error connecting to the database',
        },
      );
    }

    return post;
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
