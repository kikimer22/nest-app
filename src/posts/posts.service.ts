import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostEnt } from "./post.entity";
import * as CONSTANT from "../constants.api";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(PostEnt)
    private readonly postsRepository: Repository<PostEnt>
  ) {
  }

  async create(createPostDto: CreatePostDto): Promise<PostEnt> {
    const { title, text, authorUid, date } = createPostDto;
    const post = new PostEnt();
    post.title = title;
    post.text = text;
    post.authorUid = authorUid;
    post.date = date;
    return await this.postsRepository.save(post);
  }

  async findAll(): Promise<PostEnt[]> {
    return await this.postsRepository.find();
  }

  async findOne(id: number): Promise<PostEnt> {
    const post: PostEnt = await this.postsRepository.findOne(id);
    if (post === undefined) {
      return null;
    }
    return post;
  }

  async findAllByAuthorUid(authorUid: string): Promise<PostEnt[]> {
    return await this.postsRepository.find({ authorUid });
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }

  public clearToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException(CONSTANT.INVALID_BEARER_TOKEN);
    }
    return match[1];
  }

}
