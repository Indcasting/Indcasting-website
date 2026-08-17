import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() request: Request & { user: { id: string } }) {
    return this.users.findById(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@Req() request: Request & { user: { id: string } }, @Body() dto: UpdateUserDto) {
    return this.users.update(request.user.id, dto);
  }

  @Get()
  findAll() { return this.users.findAll(); }

  @Get(':id')
  findById(@Param('id') id: string) { return this.users.findById(id); }

  @UseGuards(JwtAuthGuard)
  @Delete('account')
  remove(@Req() request: Request & { user: { id: string } }) {
    return this.users.remove(request.user.id);
  }
}
