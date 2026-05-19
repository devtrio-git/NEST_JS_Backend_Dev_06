import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Exclude()
  password?: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  googleId?: string;

  @OneToMany(()=>Post, (post) => post.author)
  posts: Post[];

}