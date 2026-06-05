import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(private prisma: PrismaService) {}

  async create(createAnnouncementDto: CreateAnnouncementDto) {
    return await this.prisma.announcement.create({
      data: {
        ...createAnnouncementDto,
        ...(createAnnouncementDto.expiresAt
          ? { expiresAt: new Date(createAnnouncementDto.expiresAt) }
          : {}),
      },
    });
  }

  async findAll(includeInactive = false) {
    // If we only want active ones, we also check if they haven't expired
    const whereClause = includeInactive
      ? {}
      : {
          isActive: true,
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } }, // Only if expiration date is in the future
          ],
        };

    return await this.prisma.announcement.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const announcement = await this.prisma.announcement.findUnique({
      where: { id },
    });
    if (!announcement)
      throw new NotFoundException(`Duyuru bulunamadı (ID: ${id})`);
    return announcement;
  }

  async update(id: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    await this.findOne(id);

    return await this.prisma.announcement.update({
      where: { id },
      data: {
        ...updateAnnouncementDto,
        // If expiresAt is passed, convert to Date. If explicitly empty, you can handle setting it to null if needed.
        ...(updateAnnouncementDto.expiresAt
          ? { expiresAt: new Date(updateAnnouncementDto.expiresAt) }
          : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.announcement.delete({ where: { id } });
  }
}
