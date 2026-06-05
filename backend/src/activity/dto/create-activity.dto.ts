export class CreateActivityDto {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  eventDate: string; // ISO date string from frontend
  location?: string;
  isPublished?: boolean;
}
