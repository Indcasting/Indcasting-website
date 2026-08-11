import { Test, TestingModule } from '@nestjs/testing';
import { CastingCallsService } from './casting-calls.service';

describe('CastingCallsService', () => {
  let service: CastingCallsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CastingCallsService],
    }).compile();

    service = module.get<CastingCallsService>(CastingCallsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
