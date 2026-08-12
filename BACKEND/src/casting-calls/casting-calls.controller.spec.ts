import { Test, TestingModule } from '@nestjs/testing';
import { CastingCallsController } from './casting-calls.controller';

describe('CastingCallsController', () => {
  let controller: CastingCallsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastingCallsController],
    }).compile();

    controller = module.get<CastingCallsController>(CastingCallsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
