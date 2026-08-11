import { Test, TestingModule } from '@nestjs/testing';
import { TalentProfilesController } from './talent-profiles.controller';

describe('TalentProfilesController', () => {
  let controller: TalentProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalentProfilesController],
    }).compile();

    controller = module.get<TalentProfilesController>(TalentProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
