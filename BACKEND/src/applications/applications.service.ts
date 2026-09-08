import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(talentId: string, jobId: string, dto: CreateApplicationDto) {
    const job = await this.prisma.castingCall.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundException('Casting call not found');
    if (job.status !== 'active') throw new ForbiddenException('This casting call is not accepting applications');
    if (job.seekerId === talentId) throw new ForbiddenException('You cannot apply to your own casting call');
    try {
      return await this.prisma.application.create({ data: { jobId, talentId, coverNote: dto.coverNote } });
    } catch {
      throw new ConflictException('You have already applied to this casting call');
    }
  }

  findForTalent(talentId: string) {
    return this.prisma.application.findMany({ where: { talentId }, include: { job: true }, orderBy: { createdAt: 'desc' } });
  }

  findForSeeker(seekerId: string) {
    return this.prisma.application.findMany({ where: { job: { seekerId } }, include: { job: true, talent: { select: { id: true, name: true, email: true, skill: true, bio: true, avatarUrl: true } } }, orderBy: { createdAt: 'desc' } });
  }

  async updateStatus(seekerId: string, applicationId: string, status: string) {
    const application = await this.prisma.application.findUnique({ where: { id: applicationId }, include: { job: true } });
    if (!application) throw new NotFoundException('Application not found');
    if (application.job.seekerId !== seekerId) throw new ForbiddenException('You do not own this application');
    if (!['pending', 'shortlisted', 'accepted', 'rejected'].includes(status)) throw new ForbiddenException('Invalid application status');
    return this.prisma.application.update({ where: { id: applicationId }, data: { status } });
  }
}
