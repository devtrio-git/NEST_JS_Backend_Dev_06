import { postType } from './enums/postType.enum';
import { status } from './enums/status.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class Post {

  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
  })
  title: string;

  @Column({
    type: "enum",
    enum: postType,
    nullable: false,
    default: postType.POST
  })
  postType: postType;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 256,
  })
  slug: string;

  @Column({
    type: "enum",
    enum: status,
    nullable: false,
    default: status.DRAFT
  })
  status: status;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 512,
  })
  content: true;

  @Column({
    type: 'varchar',
    nullable: true
  })
  schema: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1024,
  })
  featuredImageUrl: string;

  @Column({
    type: 'timestamp',
    nullable: true
  })
  publishedOn: Date;

  tags: string[];
}