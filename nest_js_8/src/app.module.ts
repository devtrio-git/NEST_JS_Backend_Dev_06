import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [UsersModule, PostsModule, AuthModule,
  TypeOrmModule.forRootAsync({
    imports:[],
    inject: [],
    useFactory:()=>({
      type: 'postgres',
      // entities: [User],
      autoLoadEntities: true,
      synchronize: true,
      port: 5432,
      host: 'localhost',
      username: 'postgres',
      password: 'admin123',
      database: 'nestjs_database',
    })
  }),
  MetaOptionsModule,
  TagsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
