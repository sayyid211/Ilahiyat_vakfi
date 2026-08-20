import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(title: string): string {
    return (
      title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') +
      '-' +
      Math.floor(Math.random() * 1000)
    );
  }

  async create(createNewsDto: CreateNewsDto) {
    // Extract mediaFiles out so we can format them for Prisma
    const { mediaFiles, ...newsData } = createNewsDto;
    const slug = this.generateSlug(newsData.title);
    
    return await this.prisma.news.create({
      data: {
        ...newsData,
        slug,
        date: new Date(newsData.date),
        // If the admin panel sent media files, create them in the related table
        ...(mediaFiles && mediaFiles.length > 0
          ? {
              mediaFiles: {
                create: mediaFiles.map((file) => ({
                  url: file.url,
                  type: file.type,
                })),
              },
            }
          : {}),
      },
      // Return the new media files back to the frontend immediately
      include: { mediaFiles: true }, 
    });
  }

  async findAll(includeUnpublished = false) {
    return await this.prisma.news.findMany({
      where: includeUnpublished ? {} : { isPublished: true },
      orderBy: { date: 'desc' },
      include: { mediaFiles: true }, // ADDED: Fetch the media slider files
    });
  }

  async findOne(id: string) {
    const news = await this.prisma.news.findUnique({
      where: { id },
      include: { mediaFiles: true }, // ADDED: Fetch the media slider files
    });

    if (!news) {
      throw new NotFoundException(`Haber bulunamadı (ID: ${id})`);
    }

    return news;
  }

  async findBySlug(slug: string) {
    const news = await this.prisma.news.findUnique({
      where: { slug },
      include: { mediaFiles: true }, // ADDED: Fetch the media slider files
    });

    if (!news) {
      throw new NotFoundException(`Haber bulunamadı (Slug: ${slug})`);
    }

    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    await this.findOne(id);
    
    // Extract mediaFiles to handle them separately
    const { mediaFiles, ...updateData } = updateNewsDto;

    let newSlug: string | undefined = undefined;
    if (updateData.title) {
      newSlug = this.generateSlug(updateData.title);
    }

    return await this.prisma.news.update({
      where: { id },
      data: {
        ...updateData,
        ...(newSlug ? { slug: newSlug } : {}),
        ...(updateData.date ? { date: new Date(updateData.date) } : {}),
        
        // If the frontend sends an updated media list:
        // We delete the old related media rows and create the new ones.
        ...(mediaFiles 
          ? {
              mediaFiles: {
                deleteMany: {}, // Clear out the old slider files
                create: mediaFiles.map((file) => ({
                  url: file.url,
                  type: file.type,
                })),
              },
            }
          : {}),
      },
      include: { mediaFiles: true }, // Return the updated list
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.news.delete({
      where: { id },
      // Note: Because we added onDelete: Cascade in the Prisma schema earlier,
      // deleting this news article will automatically delete the related NewsMedia rows!
    });
  }
}