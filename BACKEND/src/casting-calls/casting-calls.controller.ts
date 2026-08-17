import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCastingCallDto } from './dto/create-casting-call.dto';
import { CastingCallsService } from './casting-calls.service';

@Controller('casting-calls')
export class CastingCallsController {
  constructor(private readonly casting: CastingCallsService) {}

  @Get() findAll() { return this.casting.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.casting.findOne(id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seeker')
  @Post()
  create(@Req() request: Request & { user: { id: string } }, @Body() dto: CreateCastingCallDto) { return this.casting.create(request.user.id, dto); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seeker')
  @Patch(':id')
  update(@Req() request: Request & { user: { id: string } }, @Param('id') id: string, @Body() dto: Partial<CreateCastingCallDto>) { return this.casting.update(id, request.user.id, dto); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seeker')
  @Delete(':id')
  remove(@Req() request: Request & { user: { id: string } }, @Param('id') id: string) { return this.casting.remove(id, request.user.id); }
}
