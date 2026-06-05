export class CreateAnnouncementDto {
  title: string;
  imageUrl: string;
  linkUrl?: string;
  isActive?: boolean;
  expiresAt?: string; // Optional expiration date
}
