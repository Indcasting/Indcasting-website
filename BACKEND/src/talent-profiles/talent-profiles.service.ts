import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class TalentProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      where: {
        role: 'talent',
      },
      select: {
        id: true,
        name: true,
        region: true,
        experience: true,
        primarySkill: true,
        skill: true,
        bio: true,
        tags: true,
        avatarUrl: true,
        verified: true,
        available: true,
        language: true,
        instagram: true,
        youtube: true,
        website: true,
        portfolio: true,
        joinedDate: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
        role: 'talent',
      },
      select: {
        id: true,
        name: true,
        region: true,
        experience: true,
        primarySkill: true,
        skill: true,
        bio: true,
        tags: true,
        avatarUrl: true,
        verified: true,
        available: true,
        language: true,
        instagram: true,
        youtube: true,
        website: true,
        portfolio: true,
        joinedDate: true,
        createdAt: true,
      },
    });
  }
}