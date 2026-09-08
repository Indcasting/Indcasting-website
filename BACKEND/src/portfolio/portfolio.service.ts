import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

const portfolioInclude = {
  skills: { orderBy: { sortOrder: 'asc' as const } },
  experiences: { orderBy: { sortOrder: 'asc' as const } },
  education: { orderBy: { sortOrder: 'asc' as const } },
  projects: { orderBy: { sortOrder: 'asc' as const } },
  certifications: { orderBy: { sortOrder: 'asc' as const } },
  achievements: { orderBy: { sortOrder: 'asc' as const } },
  languages: { orderBy: { sortOrder: 'asc' as const } },
  socialLinks: true,
  interests: { orderBy: { sortOrder: 'asc' as const } },
};

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  findMine(userId: string) {
    return this.prisma.portfolio.findUnique({ where: { userId }, include: portfolioInclude });
  }

  findPublished(slug: string) {
    return this.prisma.portfolio.findFirst({
      where: { usernameSlug: slug, isPublished: true },
      include: portfolioInclude,
    });
  }

  async save(userId: string, body: any) {
    const basic = body.basicInfo ?? {};
    const data = {
      usernameSlug: body.usernameSlug,
      isPublished: body.isPublished ?? false,
      completionPercentage: body.completionPercentage ?? 0,
      fullName: basic.fullName,
      professionalTitle: basic.professionalTitle,
      profilePictureUrl: basic.profilePicture || null,
      coverBannerUrl: basic.coverBanner || null,
      bio: basic.bio,
      location: basic.location,
      email: basic.email,
      phone: basic.phone,
      website: basic.website,
      linkedin: basic.linkedin,
      github: basic.github,
      portfolioUrl: basic.portfolioUrl,
      resumeUrl: body.resume || null,
      privacyEmail: body.privacyControls?.email,
      privacyPhone: body.privacyControls?.phone,
      privacyResume: body.privacyControls?.resume,
      privacyProjects: body.privacyControls?.projects,
      privacyAchievements: body.privacyControls?.achievements,
      privacySocialLinks: body.privacyControls?.socialLinks,
    };

    const portfolio = await this.prisma.portfolio.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });

    await this.prisma.$transaction(async (tx) => {
      await tx.portfolioSkill.deleteMany({ where: { portfolioId: portfolio.id } });
      await tx.portfolioExperience.deleteMany({ where: { portfolioId: portfolio.id } });
      await tx.portfolioEducation.deleteMany({ where: { portfolioId: portfolio.id } });
      await tx.portfolioProject.deleteMany({ where: { portfolioId: portfolio.id } });
      await tx.portfolioCertification.deleteMany({ where: { portfolioId: portfolio.id } });
      await tx.portfolioAchievement.deleteMany({ where: { portfolioId: portfolio.id } });
      await tx.portfolioLanguage.deleteMany({ where: { portfolioId: portfolio.id } });
      await tx.portfolioInterest.deleteMany({ where: { portfolioId: portfolio.id } });
      await tx.portfolioSocialLinks.deleteMany({ where: { portfolioId: portfolio.id } });

      if (Array.isArray(body.skills)) await tx.portfolioSkill.createMany({ data: body.skills.map((x: any, i: number) => ({ portfolioId: portfolio.id, name: x.name, proficiency: x.proficiency, sortOrder: i })) });
      if (Array.isArray(body.experience)) await tx.portfolioExperience.createMany({ data: body.experience.map((x: any, i: number) => ({ portfolioId: portfolio.id, company: x.company, role: x.role, employmentType: x.employmentType, startDate: x.startDate, endDate: x.endDate, description: x.description, sortOrder: i })) });
      if (Array.isArray(body.education)) await tx.portfolioEducation.createMany({ data: body.education.map((x: any, i: number) => ({ portfolioId: portfolio.id, institution: x.institution, degree: x.degree, specialization: x.specialization, startYear: x.startYear, endYear: x.endYear, score: x.score, sortOrder: i })) });
      if (Array.isArray(body.projects)) await tx.portfolioProject.createMany({ data: body.projects.map((x: any, i: number) => ({ portfolioId: portfolio.id, title: x.title, description: x.description, technologies: x.technologies ?? [], githubLink: x.githubLink || null, liveDemoLink: x.liveDemoLink || null, images: x.images ?? [], videoUrl: x.video || null, featured: !!x.featured, sortOrder: i })) });
      if (Array.isArray(body.certifications)) await tx.portfolioCertification.createMany({ data: body.certifications.map((x: any, i: number) => ({ portfolioId: portfolio.id, name: x.name, organization: x.organization, issueDate: x.issueDate, credentialId: x.credentialId, credentialUrl: x.credentialUrl || null, certificateImage: x.certificateImage || null, sortOrder: i })) });
      if (Array.isArray(body.achievements)) await tx.portfolioAchievement.createMany({ data: body.achievements.map((x: any, i: number) => ({ portfolioId: portfolio.id, title: x.title, type: x.type, description: x.description, sortOrder: i })) });
      if (Array.isArray(body.languages)) await tx.portfolioLanguage.createMany({ data: body.languages.map((x: any, i: number) => ({ portfolioId: portfolio.id, name: x.name, proficiency: x.proficiency, sortOrder: i })) });
      if (Array.isArray(body.interests)) await tx.portfolioInterest.createMany({ data: body.interests.map((name: string, i: number) => ({ portfolioId: portfolio.id, name, sortOrder: i })) });
      if (body.socialLinks) await tx.portfolioSocialLinks.create({ data: { portfolioId: portfolio.id, ...body.socialLinks } });
    });

    return this.findMine(userId);
  }

  async setPublished(userId: string, published: boolean) {
    const portfolio = await this.prisma.portfolio.findUnique({ where: { userId } });
    if (!portfolio) throw new NotFoundException('Portfolio not found');
    return this.prisma.portfolio.update({ where: { userId }, data: { isPublished: published }, include: portfolioInclude });
  }
}
