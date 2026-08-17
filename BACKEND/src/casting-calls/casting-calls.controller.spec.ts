import { Test, TestingModule } from '@nestjs/testing';
import { CastingCallsController } from './casting-calls.controller';
import { CastingCallsService } from './casting-calls.service';

describe('CastingCallsController', () => {
  let controller: CastingCallsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastingCallsController],
      providers: [{ provide: require('./castingcallsservice').CastingCallsService, useValue: {} }],
    }).compile();

    controller = module.get<CastingCallsController>(CastingCallsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
