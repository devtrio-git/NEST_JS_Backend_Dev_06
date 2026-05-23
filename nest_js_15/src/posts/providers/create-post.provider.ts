import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UserActiveDecorator } from '../../auth/decorator/active-user.decorator';
import { IActiveUser } from '../../auth/interface/active-user.interface';
import { Post } from '../post.entity';
import { UsersService } from '../../users/providers/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { TagsService } from '../../tags/providers/tags.service';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(MetaOption)

    private readonly tagsService: TagsService,
  ) {
  }

  async createPost(createPostDto: CreatePostDto, @UserActiveDecorator() user: IActiveUser): Promise<Post> {
    let author = undefined;
    let tags = [];

    try {
      author = await this.usersService.findUserById(user.sub);
      if ((createPostDto.tags.length ?? 0) > 0) {
        tags = await this.tagsService.findMultipleTags(createPostDto.tags);
      }
    } catch (error) {
      throw new RequestTimeoutException();
    }

    if (tags.length !== createPostDto.tags.length) {
      throw new BadRequestException('Please enter a valid tags!');
    }

    let post = this.postRepository.create({
      ...createPostDto,
      tags: tags,
      author: author,
    });


    try {
      post = await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException();
    }
    return post;
  }


}
