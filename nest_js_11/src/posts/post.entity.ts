import { postType } from './enums/postType.enum';
import { status } from './enums/status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MetaOption } from "../meta-options/meta-option.entity";
import { User } from '../users/user.entity';
import { Tag } from '../tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

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
    type: 'text',
    nullable: true
  })
  content: string;

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

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post,
    {
      cascade: true,
      eager: true, // Query with eager loading
    })
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
  })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    eager: true,
  })
  @JoinTable()
  tags: Tag[];
}