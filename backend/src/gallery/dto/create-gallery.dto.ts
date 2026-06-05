import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsArray, 
  IsDateString, 
  IsBoolean 
} from 'class-validator';

export class CreateGalleryDto {
  @IsString({ message: 'Albüm adı metin olmalıdır.' })
  @IsNotEmpty({ message: 'Albüm adı boş bırakılamaz.' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString({ message: 'Kapak görseli metin (URL) olmalıdır.' })
  @IsNotEmpty({ message: 'Kapak görseli zorunludur.' })
  coverImage: string;

  @IsArray({ message: 'Medya dosyaları bir dizi (array) olmalıdır.' })
  @IsString({ each: true, message: 'Her bir medya URL\'si metin olmalıdır.' })
  mediaUrls: string[];

  @IsDateString({}, { message: 'Geçerli bir tarih formatı girilmelidir (ISO-8601).' })
  @IsNotEmpty({ message: 'Etkinlik tarihi zorunludur.' })
  eventDate: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}