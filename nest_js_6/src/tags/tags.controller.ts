import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {}
