import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads', // Where to save it
        filename: (req, file, cb) => {
          // Generate a random string to prevent filename collisions
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Security measure: Allow both image and video files
        if (
          !file.mimetype.startsWith('image/') &&
          !file.mimetype.startsWith('video/')
        ) {
          return cb(
            new BadRequestException(
              'Sadece resim ve video dosyaları yüklenebilir!',
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB limit to allow video uploads
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Dosya bulunamadı veya boyutu çok büyük.');
    }

    // Return the URL that the frontend needs to save in the database.
    // We retain the "imageUrl" key because the frontend expects it, 
    // even though it might now be a video URL.
    return {
      imageUrl: `/public/uploads/${file.filename}`,
    };
  }
}