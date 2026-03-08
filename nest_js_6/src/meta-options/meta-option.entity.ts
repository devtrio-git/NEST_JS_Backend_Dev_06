import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


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

}