import { CreatePostDto } from "./create-post.dto";

export class UpdatePostDto implements CreatePostDto {
  id: number;
  authorUid: string;
  date: Date;
  text: string;
  title: string;
}
