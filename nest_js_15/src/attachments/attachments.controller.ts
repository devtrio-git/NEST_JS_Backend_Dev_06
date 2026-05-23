import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AttachmentsService } from "./providers/attachments.service";

@ApiTags('attachments')
@Controller('attachments')
export class AttachmentsController {

  constructor(private readonly attachmentsService: AttachmentsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiHeaders([
    { name: 'Content-type', description: 'multipart/form-data' },
    { name: 'Authorization', description: 'Bearer token' },
  ])
  @ApiOperation({ summary: 'Upload attachment' })
  @Post('upload')
  public uploadFile(@UploadedFile() file:Express.Multer.File, @Body('module') module?:string) {
    return this.attachmentsService.uploadAttachment(file, module);
  }
}
