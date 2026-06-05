import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
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

  async create(createActivityDto: CreateActivityDto) {
    const slug = this.generateSlug(createActivityDto.title);

    return await this.prisma.activity.create({
      data: {
        ...createActivityDto,
        slug,
        eventDate: new Date(createActivityDto.eventDate),
      },
    });
  }

  async findAll(includeUnpublished = false) {
    return await this.prisma.activity.findMany({
      where: includeUnpublished ? {} : { isPublished: true },
      orderBy: { eventDate: 'desc' }, // Order by when the event happens
    });
  }

  async findOne(id: string) {
    const activity = await this.prisma.activity.findUnique({ where: { id } });
    if (!activity)
      throw new NotFoundException(`Etkinlik bulunamadı (ID: ${id})`);
    return activity;
  }

  async findBySlug(slug: string) {
    const activity = await this.prisma.activity.findUnique({ where: { slug } });
    if (!activity)
      throw new NotFoundException(`Etkinlik bulunamadı (Slug: ${slug})`);
    return activity;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    await this.findOne(id);

    let newSlug: string | undefined = undefined;
    if (updateActivityDto.title) {
      newSlug = this.generateSlug(updateActivityDto.title);
    }

    return await this.prisma.activity.update({
      where: { id },
      data: {
        ...updateActivityDto,
        ...(newSlug ? { slug: newSlug } : {}),
        ...(updateActivityDto.eventDate
          ? { eventDate: new Date(updateActivityDto.eventDate) }
          : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.activity.delete({ where: { id } });
  }
}
