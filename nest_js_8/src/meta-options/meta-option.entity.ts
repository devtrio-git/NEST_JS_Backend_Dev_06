import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';


@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  metaValue:string;

  @CreateDateColumn()
  createdAt :Date;

  @UpdateDateColumn()
  updatedAt:Date;

  @OneToOne(() => Post, (post) => post.metaOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn() // req decorator, create metaOption id as FK
  post?: Post;


}