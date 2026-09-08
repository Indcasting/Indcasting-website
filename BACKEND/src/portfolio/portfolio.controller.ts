import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolio: PortfolioService) {}

  @Get('public/:slug')
  getPublic(@Param('slug') slug: string) { return this.portfolio.findPublished(slug); }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  mine(@Req() request: Request & { user: { id: string } }) { return this.portfolio.findMine(request.user.id); }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@Req() request: Request & { user: { id: string } }, @Body() body: any) { return this.portfolio.save(request.user.id, body); }

  @UseGuards(JwtAuthGuard)
  @Post('me/publish')
  publish(@Req() request: Request & { user: { id: string } }) { return this.portfolio.setPublished(request.user.id, true); }

  @UseGuards(JwtAuthGuard)
  @Post('me/unpublish')
  unpublish(@Req() request: Request & { user: { id: string } }) { return this.portfolio.setPublished(request.user.id, false); }
}
