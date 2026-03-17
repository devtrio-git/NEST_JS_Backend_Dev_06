import { Controller,Post, Body } from '@nestjs/common';
import { MetaOptionsService } from "./providers/meta-options.service";
import { CreatePostMetaOptionDto } from "./dtos/create-post-meta-option.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('meta-options')
@ApiTags('meta-options')
export class MetaOptionsController {

  constructor(private readonly metaOptionService: MetaOptionsService) {}


  @Post()
  create(@Body() dto: CreatePostMetaOptionDto) {
    return this.metaOptionService.createMetaOption((dto))
  }

}
