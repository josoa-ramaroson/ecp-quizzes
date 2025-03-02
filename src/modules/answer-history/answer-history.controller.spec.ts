import { Test, TestingModule } from '@nestjs/testing';
import { AnswerHistoryController } from './answer-history.controller';
import { AnswerHistoryService } from './answer-history.service';

describe('AnswerHistoryController', () => {
  let controller: AnswerHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerHistoryController],
      providers: [AnswerHistoryService],
    }).compile();

    controller = module.get<AnswerHistoryController>(AnswerHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
