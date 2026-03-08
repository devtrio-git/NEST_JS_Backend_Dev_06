import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name:string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  description?:string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?:string;

  @CreateDateColumn()
  createdAt :Date;

  @UpdateDateColumn()
  updatedAt:Date;

  @DeleteDateColumn()
  deletedAt:Date;
}