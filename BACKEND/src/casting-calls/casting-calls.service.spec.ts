import { Test, TestingModule } from '@nestjs/testing';
import { CastingCallsService } from './casting-calls.service';
import { PrismaService } from '../database/prisma.service';

describe('CastingCallsService', () => {
  let service: CastingCallsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CastingCallsService, { provide: PrismaService, useValue: {} },],
    }).compile();

    service = module.get<CastingCallsService>(CastingCallsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
