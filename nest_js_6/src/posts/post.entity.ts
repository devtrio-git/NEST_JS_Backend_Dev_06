import { postType } from './enums/postType.enum';
import { status } from './enums/status.enum';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MetaOption } from '../meta-options/meta-option.entity';

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
    type: 'enum',
    enum: postType,
    nullable: false,
    default: postType.POST,
  })
  postType: postType;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 256,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: status,
    nullable: false,
    default: status.DRAFT,
  })
  status: status;

  @Column({
    type: 'text',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'varchar',
    nullable: true,
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
    nullable: true,
  })
  publishedOn: Date;

  @OneToOne(() => MetaOption, {
    cascade: true,
    eager: true, // Query with eager loading
  }) // req decorator
  @JoinColumn() // req decorator, create metaOption id as FK
  metaOptions?: MetaOption;

  // tags: string[];
}