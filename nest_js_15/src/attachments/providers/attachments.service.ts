import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Attachment } from '../attachment.entity';
import { UploadToAwsProvider } from './upload/upload-to-aws.provider';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Express } from 'express';
import { IAttachmentFile } from '../interfaces/attachment-file.interface';
import { FileType } from '../enums/file-type.enum';

@Injectable()
export class AttachmentsService {
  constructor(
    // Inject entity
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,

    // Inject Provider
    private readonly uploadToAwsProvider: UploadToAwsProvider,

    // Inject config service
    private readonly configService: ConfigService,
  ) {}

  public async uploadAttachment(file: Express.Multer.File, module?: string) {
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/jpg'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('File type not allowed!');
    }


    try {
      const name = await this.uploadToAwsProvider.fileUpload(file, module);
      const attachmentFile: IAttachmentFile = {
        name,
        path: `https://${this.configService.get('environment.awsCloudfrontUrl')}/${name}`,
        type: FileType.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = this.attachmentRepository.create(attachmentFile);
      return await this.attachmentRepository.save(upload);
    } catch (err) {
      throw new ConflictException();
    }
  }
}
