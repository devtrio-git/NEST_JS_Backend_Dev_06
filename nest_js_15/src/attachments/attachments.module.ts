import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './providers/attachments.service';
import { UploadToAwsProvider } from './providers/upload/upload-to-aws.provider';
import { Attachment } from './attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, UploadToAwsProvider]
})
export class AttachmentsModule {}
