import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }


  async findMultipleTags(ids: number[]){
    return await  this.tagRepository.find({
      where: {
        id: In(ids)
      }
    })
  }

  async delete(id: number){
     await  this.tagRepository.delete(id);
     return {id, deleted: true};
  }

}
