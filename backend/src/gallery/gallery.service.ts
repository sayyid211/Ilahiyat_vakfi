import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path if needed
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  // Helper to create SEO slugs
  private slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-');    // Replace multiple - with single -
  }

  async create(createGalleryDto: CreateGalleryDto) {
    const baseSlug = this.slugify(createGalleryDto.title);
    const uniqueSlug = `${baseSlug}-${Math.floor(Math.random() * 1000)}`;

    return this.prisma.gallery.create({
      data: {
        ...createGalleryDto,
        slug: uniqueSlug,
      },
    });
  }

  async findAll(all?: boolean) {
    if (all) {
      return this.prisma.gallery.findMany({
        orderBy: { eventDate: 'desc' },
      });
    }
    return this.prisma.gallery.findMany({
      where: { isPublished: true },
      orderBy: { eventDate: 'desc' },
    });
  }

  async findOne(id: string) {
    const gallery = await this.prisma.gallery.findUnique({ where: { id } });
    if (!gallery) throw new NotFoundException('Albüm bulunamadı');
    return gallery;
  }

  async findBySlug(slug: string) {
    const gallery = await this.prisma.gallery.findUnique({ where: { slug } });
    if (!gallery) throw new NotFoundException('Albüm bulunamadı');
    return gallery;
  }

  async update(id: string, updateGalleryDto: UpdateGalleryDto) {
    return this.prisma.gallery.update({
      where: { id },
      data: updateGalleryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.gallery.delete({ where: { id } });
  }
}