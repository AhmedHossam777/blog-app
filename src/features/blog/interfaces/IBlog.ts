import type { IAuthor } from "./IAuthor";

export interface IBlog {
  id: string;
  title: string;
  content: string;
  image_url: string;
  author: IAuthor;
  created_at: string;
}
