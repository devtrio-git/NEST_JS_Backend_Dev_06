import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'node:path';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}

  public async fileUpload(file: Express.Multer.File, module?: string) {
      const s3 = new S3();
      try {
          const file_name = this.generateFileName(file);
          const uploadResult = await s3.upload({
            Bucket: this.configService.get('environment.awsPublicBucket'),
            Body: file.buffer,
            Key: module ? `${module}/${file_name}` : file_name,
            ContentType: file.mimetype,
          }).promise();

          return uploadResult.Key;

      }catch (error) {
        throw new RequestTimeoutException(error);
      }
  }


  private generateFileName(file: Express.Multer.File) {
    let name = file.originalname.split('.')[0].replace(/\s/g, '').trim();
    let extension = path.extname(file.originalname);
    let timestamp = new Date().getTime().toString().trim();
    return `${name}-${timestamp}-${uuid4()}${extension}`;
  }
}
