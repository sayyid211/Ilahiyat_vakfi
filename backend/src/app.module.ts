import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { NewsModule } from './news/news.module';
import { ActivityModule } from './activity/activity.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { GalleryModule } from './gallery/gallery.module';


@Module({
  imports: [
    PrismaModule,
    NewsModule,
    ActivityModule,
    AnnouncementModule,
    ServeStaticModule.forRoot({
      rootPath: '/root/var/www/Ilahiyat_vakfi/backend/public', //join(__dirname, '..', 'public'),
      serveRoot: '/api/public', // This means images will be accessible at http://localhost:4000/public/uploads/...
      serveStaticOptions: {
        index: false, // Disable directory listing
      },
    }),
    UploadModule,
    GalleryModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
