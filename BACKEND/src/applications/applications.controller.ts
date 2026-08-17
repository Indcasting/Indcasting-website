import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationsService } from './applications.service';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private readonly applications: ApplicationsService) {}

  @Post(':jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('talent')
  create(@Req() request: Request & { user: { id: string } }, @Param('jobId') jobId: string, @Body() dto: CreateApplicationDto) { return this.applications.create(request.user.id, jobId, dto); }

  @Get('mine')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('talent')
  mine(@Req() request: Request & { user: { id: string } }) { return this.applications.findForTalent(request.user.id); }

  @Get('received')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seeker')
  received(@Req() request: Request & { user: { id: string } }) { return this.applications.findForSeeker(request.user.id); }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seeker')
  updateStatus(@Req() request: Request & { user: { id: string } }, @Param('id') id: string, @Body('status') status: string) { return this.applications.updateStatus(request.user.id, id, status); }
}
