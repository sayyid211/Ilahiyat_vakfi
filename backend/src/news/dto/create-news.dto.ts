export class CreateNewsDto {
  title!: string;
  description!: string;
  content!: string;
  imageUrl!: string;
  date!: string; // ISO date string from the frontend
  isPublished?: boolean;
}
