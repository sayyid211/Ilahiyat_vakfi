import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // This makes Prisma available everywhere without needing to import the module constantly
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
