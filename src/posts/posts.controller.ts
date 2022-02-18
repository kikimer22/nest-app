import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostEnt } from "./post.entity";
import { UpdatePostDto } from "./dto/update-post.dto";


@Controller("posts")
export class PostsController {

  constructor(private readonly postsService: PostsService) {
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEnt> {
    return await this.postsService.create(createPostDto);
  }

  @Patch(":id")
  async update(@Body() updatePostDto: UpdatePostDto): Promise<any> {
    return await this.postsService.update(updatePostDto);
  }

  @Get()
  findAll(): Promise<PostEnt[]> {
    return this.postsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<PostEnt> {
    return this.postsService.findOne(id);
  }

  @Get("filter/:authorUid")
  findAllByAuthorUid(@Param("authorUid") authorUid: string): Promise<PostEnt[]> {
    return this.postsService.findAllByAuthorUid(authorUid);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.postsService.remove(id);
  }
}
