import { FileType } from '../enums/file-type.enum';

export interface IAttachmentFile {
  name: string;
  path: string;
  type: FileType;
  mime: string;
  size: number;
}