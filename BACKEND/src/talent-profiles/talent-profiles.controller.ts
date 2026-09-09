import {
  Controller,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TalentProfilesService } from './talent-profiles.service';

@Controller('talent-profiles')
export class TalentProfilesController {
  constructor(
    private readonly talentProfilesService: TalentProfilesService,
  ) {}

  @Get()
  async findAll() {
    return this.talentProfilesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const talent = await this.talentProfilesService.findOne(id);

    if (!talent) {
      throw new NotFoundException('Talent profile not found');
    }

    return talent;
  }
}