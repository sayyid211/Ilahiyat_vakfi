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
    const slug = this.generateSlug(createNewsDto.title);
    const client: any = this.prisma;
    return await client.news.create({
      data: {
        ...createNewsDto,
        slug,
        date: new Date(createNewsDto.date),
      },
    });
  }

  async findAll(includeUnpublished = false) {
    const client: any = this.prisma;
    return await client.news.findMany({
      where: includeUnpublished ? {} : { isPublished: true },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const client: any = this.prisma;
    const news = await client.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException(`Haber bulunamadı (ID: ${id})`);
    }

    return news;
  }

  async findBySlug(slug: string) {
    const client: any = this.prisma;
    const news = await client.news.findUnique({
      where: { slug },
    });

    if (!news) {
      throw new NotFoundException(`Haber bulunamadı (Slug: ${slug})`);
    }

    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    await this.findOne(id);

    // FIX 1: Explicitly type this as string or undefined
    let newSlug: string | undefined = undefined;
    if (updateNewsDto.title) {
      newSlug = this.generateSlug(updateNewsDto.title);
    }

    return await this.prisma.news.update({
      where: { id },
      data: {
        ...updateNewsDto,
        // FIX 2: Use ternary operators for conditional spreading
        ...(newSlug ? { slug: newSlug } : {}),
        ...(updateNewsDto.date ? { date: new Date(updateNewsDto.date) } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    const client: any = this.prisma;
    return await client.news.delete({
      where: { id },
    });
  }
}
