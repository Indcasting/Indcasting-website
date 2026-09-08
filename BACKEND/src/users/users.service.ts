import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

const safeSelect = {
  id: true, name: true, email: true, mobile: true, city: true, region: true, role: true,
  plan: true, language: true, companyName: true, primarySkill: true, experience: true,
  verified: true, available: true, joinedDate: true, skill: true, bio: true, tags: true,
  avatarUrl: true, instagram: true, youtube: true, website: true, portfolio: true, createdAt: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: safeSelect });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({ select: safeSelect, orderBy: { createdAt: 'desc' } });
  }

  async update(id: string, dto: UpdateUserDto) {
    const data: Record<string, unknown> = { ...dto };
    if (dto.email) {
      data.email = dto.email.trim().toLowerCase();
      const existing = await this.prisma.user.findFirst({ where: { email: data.email as string, NOT: { id } } });
      if (existing) throw new ConflictException('Email is already in use');
    }
    if (dto.phone !== undefined) { data.mobile = dto.phone; delete data.phone; }
    if (dto.city !== undefined) { data.region = dto.city; delete data.city; }
    if (dto.password) data.password = await bcrypt.hash(dto.password, 12);
    return this.prisma.user.update({ where: { id }, data: data as any, select: safeSelect });
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { success: true };
  }
}
