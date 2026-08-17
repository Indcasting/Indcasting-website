import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCastingCallDto } from './dto/create-casting-call.dto';

@Injectable()
export class CastingCallsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(seekerId: string, dto: CreateCastingCallDto) {
    return this.prisma.castingCall.create({ data: { ...dto, seekerId, type: dto.type ?? 'one_off', status: 'active', shootStartDate: dto.shootStartDate ? new Date(dto.shootStartDate) : undefined, shootEndDate: dto.shootEndDate ? new Date(dto.shootEndDate) : undefined, applicationDeadline: dto.applicationDeadline ? new Date(dto.applicationDeadline) : undefined } });
  }

  findAll() {
    return this.prisma.castingCall.findMany({ orderBy: { createdAt: 'desc' }, include: { seeker: { select: { id: true, name: true, companyName: true } } } });
  }

  async findOne(id: string) {
    const item = await this.prisma.castingCall.findUnique({ where: { id }, include: { seeker: { select: { id: true, name: true, companyName: true } } } });
    if (!item) throw new NotFoundException('Casting call not found');
    return item;
  }

  async update(id: string, seekerId: string, dto: Partial<CreateCastingCallDto>) {
    const existing = await this.prisma.castingCall.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Casting call not found');
    if (existing.seekerId !== seekerId) throw new ForbiddenException('You do not own this casting call');
    return this.prisma.castingCall.update({ where: { id }, data: { ...dto, shootStartDate: dto.shootStartDate ? new Date(dto.shootStartDate) : undefined, shootEndDate: dto.shootEndDate ? new Date(dto.shootEndDate) : undefined, applicationDeadline: dto.applicationDeadline ? new Date(dto.applicationDeadline) : undefined } });
  }

  async remove(id: string, seekerId: string) {
    const existing = await this.prisma.castingCall.findUnique({ where: { id }, select: { seekerId: true } });
    if (!existing) throw new NotFoundException('Casting call not found');
    if (existing.seekerId !== seekerId) throw new ForbiddenException('You do not own this casting call');
    await this.prisma.castingCall.delete({ where: { id } });
    return { success: true };
  }
}
