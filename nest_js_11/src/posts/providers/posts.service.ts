import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UserService } from '../../users/providers/users.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { TagsService } from '../../tags/providers/tags.service';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from '../../common/pagination/provider/pagination.provider';
import { Paginated } from '../../common/pagination/interfaces/paginated.interface';

@Injectable()
export class PostsService {
  // inter modular dependency
  constructor(
    private readonly userService: UserService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,

    private readonly tagsService: TagsService,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    let author = await this.userService.findUserById(createPostDto.authorId);
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

  async allPosts(postQuery: GetPostsDto, userId: string):Promise<Paginated<Post>>  {
    return await this.paginationProvider.paginateQuery({
      page: postQuery.page,
      limit: postQuery.limit,
    }, this.postRepository);
  }
  // async deletePost(id: number) {
  //   // find the post
  //   const post = await this.postRepository.findOneBy({ id });
  //   // delete the post first
  //   await this.postRepository.delete(id)
  //
  //   // then delete it metaOption
  //   if (post.metaOptions)
  //     await this.metaOptionRepository.delete(post.metaOptions.id)
  //
  //   // confirmation message
  //
  //   return { deleted: true, id };
  // }

  // async deletePost(id: number) {
  //   const post = await this.postRepository.findOneBy({ id });
  //   const inverse_post = await this.metaOptionRepository.find({
  //     where: { id: post.metaOptions.id },
  //     relations: {
  //       post: true,
  //     },
  //   });
  //
  //   return inverse_post;
  // }

  async deletePost(id: number) {
    await this.postRepository.delete(id);
    return { deleted: true, id };
  }

  async updatePost(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;

    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
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
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;
    post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;
    post.tags = tags;

    try {
      post = await this.postRepository.save(post);
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }

    return post;
  }
}
