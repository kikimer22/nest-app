import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PostEnt} from "./post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostEnt])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule {
}
