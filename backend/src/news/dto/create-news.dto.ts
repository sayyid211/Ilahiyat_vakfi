export class CreateNewsDto {
  title!: string;
  description!: string;
  content!: string;
  imageUrl!: string; // Still here as the cover photo
  date!: string; 
  isPublished?: boolean;
  
  // NEW: The array of extra media files (pictures or videos)
  mediaFiles?: {
    url: string;
    type: string; // 'image' or 'video'
  }[];
}