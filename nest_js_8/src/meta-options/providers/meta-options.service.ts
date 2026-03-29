import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionDto } from '../dtos/create-post-meta-option.dto';

@Injectable()
export class MetaOptionsService {

  constructor(
    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>,
  ) {}


  async createMetaOption(createMetaOptionDto: CreatePostMetaOptionDto){
    let metaOptions =  this.metaOptionRepository.create(createMetaOptionDto);
    metaOptions = await this.metaOptionRepository.save(metaOptions);
    return metaOptions;
  }


}
