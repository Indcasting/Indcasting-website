import { Module } from '@nestjs/common';
import { TalentProfilesController } from './talent-profiles.controller';
import { TalentProfilesService } from './talent-profiles.service';

@Module({
  controllers: [TalentProfilesController],
  providers: [TalentProfilesService]
})
export class TalentProfilesModule {}
