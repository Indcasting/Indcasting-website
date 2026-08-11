import { Test, TestingModule } from '@nestjs/testing';
import { TalentProfilesService } from './talent-profiles.service';

describe('TalentProfilesService', () => {
  let service: TalentProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalentProfilesService],
    }).compile();

    service = module.get<TalentProfilesService>(TalentProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
